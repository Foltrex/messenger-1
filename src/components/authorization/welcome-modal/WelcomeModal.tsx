import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import style from "./WelcomeModal.module.css";
import React from "react";
import {AppState} from "../../../index";
import {
    registerRSA,
    registerTF,
    setIsLoginModalOpen,
    setIsWelcomeModalOpen
} from "../../../redux/authorization/authorizationActions";
import {connect, ConnectedProps, useDispatch} from "react-redux";

function WelcomeModal(props: Props) {

    return (
        <Dialog open={true}>
            <DialogTitle className={style.dialog__title}>
                Hello! Who are you?
            </DialogTitle>

            <DialogActions className={style.dialog__actions}>
                <Button onClick={() => {
                    props.registerRSA();
                }}
                >
                    I'm new user
                </Button>
                <Button onClick={() => {
                    props.setIsWelcomeModalOpen(false)
                    props.setIsLoginModalOpen(true)
                }}>
                    I'm already registered
                </Button>
                <Button onClick={() => {
                    props.registerTF(true);
                }}
                >
                    Ghost registration
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = (state: AppState) => ({
        isOpen: state.authorizationReducer.isWelcomeModalOpen,
})

const mapDispatchToProps = {
    setIsWelcomeModalOpen,
    setIsLoginModalOpen,
    registerTF,
    registerRSA,
}


const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(WelcomeModal);