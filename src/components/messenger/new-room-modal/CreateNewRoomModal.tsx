import * as yup from "yup";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import style from "../../../global-styles/ModalWindow.module.css";
import {Form, Formik} from "formik";
import TitleAlreadyExistsModal from "./TitleAlreadyExistsModal";
import {AppState, useAppDispatch, useAppSelector } from "../../../index";
import { setIsNewRoomModalOpened, createNewRoomTF } from "../../../redux/messenger-controls/messengerControlsActions";
import { connect, ConnectedProps } from "react-redux";


const validationSchema = yup.object().shape({
    title: yup.string().required('Room title cannot be empty').min(3)
})

const CreateNewRoomModal: React.FC<TProps> = (props) => {
     const isOpened = useAppSelector(state => state.messengerControls.isCreateNewRoomModalOpened);
     const dispatch = useAppDispatch();

     const onClose = () => dispatch(setIsNewRoomModalOpened(false));

    return (
            <Dialog open={isOpened} onClose={onClose} maxWidth={"sm"} fullWidth>
                <DialogTitle className={style.dialog__title}>Enter room title</DialogTitle>
                <Formik
                    initialValues={{title: ''}}
                    onSubmit={(values) => {
						props.createNewRoomTF(values.title)
                    }}
                    validationSchema={validationSchema}
                >
                    {formik => (
                        <div>
                            <Form >
                                <DialogContent className={style.dialog__content}>
                                    <TextField
                                        className={style.dialog__text_field}
                                        autoFocus margin="dense" type="text"
                                        defaultValue={formik.values.title}
                                        onChange={(event) => formik.setFieldValue('title', event.target.value)}
                                        error={!!formik.errors.title} helperText={formik.errors.title}
                                        fullWidth variant="standard" placeholder={"Room title"}
                                    />
                                </DialogContent>
                                <DialogActions className={style.dialog__actions}>
                                    <Button onClick={onClose}>Cancel</Button>
                                    <Button type={"submit"} disabled={!formik.isValid}>Create</Button>
                                </DialogActions>
                            </Form>
                            <TitleAlreadyExistsModal title={formik.values.title}/>
                        </div>
                    )}
                </Formik>
            </Dialog>
    );
}

const mapStateToProps = (state: AppState) => ({
	user: state.messenger.user
})

const mapDispatchToProps = {
	createNewRoomTF
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

export default connector(CreateNewRoomModal);