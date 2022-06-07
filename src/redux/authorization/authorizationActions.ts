import {SET_IS_LOGIN_MODAL_OPEN, SET_IS_REGISTRATION_MODAL_OPEN, SET_IS_WELCOME_MODAL_OPEN} from "./authorizationTypes";
import {IPlainDataAction} from "../redux-types";
import {AppDispatch, AppState} from "../../index";
import {CustomerApi} from "../../api/customerApi";
import {AuthorizationService} from "../../service/authorizationService";
import {fetchMessengerStateTF, setUser} from "../messenger/messengerActions";
import {LocalStorageService} from "../../service/localStorageService";
import {setErrorPopupState} from "../error-popup/errorPopupActions";
import {User} from "../../model/user";
import {Builder} from "builder-pattern";
import {Customer} from "../../model/customer";
import nacl from "tweetnacl";
import {Action} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {CryptService} from "../../service/cryptService";


export function setIsWelcomeModalOpen(isOpen: boolean): IPlainDataAction<boolean> {

    return {
        type: SET_IS_WELCOME_MODAL_OPEN,
        payload: isOpen
    }
}

export function setIsLoginModalOpen(isOpen: boolean): IPlainDataAction<boolean> {

    return {
        type: SET_IS_LOGIN_MODAL_OPEN,
        payload: isOpen
    }
}

export function setIsRegistrationModalOpen(isOpen: boolean): IPlainDataAction<boolean>{

    return {
        type: SET_IS_REGISTRATION_MODAL_OPEN,
        payload: isOpen
    }
}

export function authenticateTF(id: string, privateKeyStr: string) {
    return (dispatch: ThunkDispatch<AppState, void, Action>) => {
        CustomerApi.getCustomer(id)
            .then(customer => {
                const publicKey = customer.pk!;
                const privateKey = CryptService.JSONByteStringToUint8(privateKeyStr);
                if(AuthorizationService.areKeysValid(publicKey, privateKey)) {
                    const user = new User();
                    user.id = customer.id;
                    user.publicKey = publicKey;
                    user.privateKey = privateKey;

                    dispatch(setUser(user));
                    dispatch(fetchMessengerStateTF(user));
                    dispatch(setIsLoginModalOpen(false));
                    LocalStorageService.userToStorage(user);
                }else{
                    dispatch(setErrorPopupState(true, 'ID or PRIVATE KEY is incorrect'))
                }
            }).catch(() => {
                dispatch(setErrorPopupState(true, 'ID or PRIVATE KEY is incorrect'))
        })
    }
}

export function registerTF() {

    return (dispatch: AppDispatch) => {
        const keyPair = nacl.box.keyPair();

        const customer = Builder(Customer)
            .pk(keyPair.publicKey)
            .build();

        CustomerApi.register(customer).then(resp => {
            const user = Builder(User)
                .id(resp.id)
                .publicKey(resp.pk!)
                .privateKey(keyPair.secretKey)
                .build();

            dispatch(setIsRegistrationModalOpen(true));
            dispatch(setUser(user));
            LocalStorageService.userToStorage(user);

        }).catch(() => {
            dispatch(setErrorPopupState(true, 'Something went wrong.'))
        })
    }
}