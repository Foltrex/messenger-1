import {AppState} from "../../../index";
import {setIsEditGlobalUsersModalOpened} from "../../../redux/messenger-menu/messengerMenuActions";
import {connect, ConnectedProps} from "react-redux";
import React from "react";
import {Button, Dialog, IconButton, Toolbar, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar/AppBar";
import style from "./EditGlobalUsers.module.css";
import CloseIcon from "@mui/icons-material/Close";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
    StringIndexArray,
    StringIndexArrayEntry,
    stringIndexArrayToArray,
    stringIndexArrayToEntryArray
} from "../../../model/stringIndexArray";
import {Chat} from "../../../model/messenger/chat";
import {setIsGlobalUserConfigurationModalOpen} from "../../../redux/messenger-controls/messengerControlsActions";


const EditGlobalUsersModal: React.FC<TProps> = (props) => {
    return (
        <Dialog open={true} maxWidth="md" fullWidth>
            <AppBar classes={{root: style.dialog__app_bar}}>
                <Toolbar>
                    <Button variant="contained" onClick={() => props.setIsGlobalUserConfigurationModalOpen(true)}>
                        Add Ghost user
                    </Button>
                    <Typography variant="h4" component="div" flex={1} mx={3} align={"center"}>
                        Edit Global Users
                    </Typography>
                    <IconButton
                        onClick={() => props.setIsEditGlobalUsersModalOpened(false)}>
                        <CloseIcon fontSize={'large'} classes={{root: style.dialog__close_icon}}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={style.search_container}>
                <div className={style.search_element_container}>
                    <label>
                        ID:&nbsp;&nbsp;
                        <input className={style.search_element_input}/>
                    </label>
                </div>
                <div className={style.search_element_container}>
                    <label>
                        Title:&nbsp;&nbsp;
                        <input className={style.search_element_input}/>
                    </label>
                </div>
                <div className={style.search_element_container}>
                    <button className={style.search_element_button}>
                        Search
                    </button>
                </div>
            </div>
            <PerfectScrollbar>
                <div className={style.list_container}>
                    {props.globalUsers.map(globalUser =>
                        <div key={globalUser.userId} className={style.list_element_container}>

                            <div className={style.list_element_column}>
                                <h2 className={style.list_id}
                                    onClick={() => props.setIsGlobalUserConfigurationModalOpen(true, globalUser)}>{globalUser.userId}</h2>
                            </div>

                            <div className={style.list_element_column}>
                                <ul>
                                    {stringIndexArrayToEntryArray<string>(globalUser.titles).map(entry =>
                                        <li>
                                            <h2 key={entry.key}>{generateUsernameToChatTitleRatio(entry, props.chats)}</h2>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </PerfectScrollbar>
        </Dialog>
    )
}

function generateUsernameToChatTitleRatio(entry: StringIndexArrayEntry<string>, chats: StringIndexArray<Chat>) {
    const chat = chats[entry.key];

    if (chat) {
        return `${chat.title} / ${entry.value}`
    }

    return `${entry.key} / ${entry.value}`
}

const mapStateToProps = (state: AppState) => ({
    globalUsers: stringIndexArrayToArray(state.messenger.globalUsers),
    chats: state.messenger.chats
})

const mapDispatchToProps = {
    setIsEditGlobalUsersModalOpened,
    setIsGlobalUserConfigurationModalOpen
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

export default connector(EditGlobalUsersModal);