import {
    SET_IS_ADD_USER_MODAL_OPENED, SET_IS_EDIT_ROOM_TITLE_MODAL_OPEN,
    SET_IS_MEMBERS_MODAL_OPEN,
    TMessengerMenuAction,
    TMessengerMenuState
} from "./messengerMenuTypes";

const initialState: TMessengerMenuState = {
    isMembersModalOpen: false,
    isAddUserModalOpened: false,
    isEditRoomTitleModalOpen: false
}

export function messengerMenuReducer(state: TMessengerMenuState = initialState, action: TMessengerMenuAction) {
    switch (action.type) {

        case SET_IS_MEMBERS_MODAL_OPEN:
            return {...initialState, isMembersModalOpen: action.payload}

        case SET_IS_ADD_USER_MODAL_OPENED:
            return {...initialState, isAddUserModalOpened: action.payload}

        case SET_IS_EDIT_ROOM_TITLE_MODAL_OPEN:
            return {...initialState, isEditRoomTitleModalOpen: action.payload}

        default:
            return state;
    }
}