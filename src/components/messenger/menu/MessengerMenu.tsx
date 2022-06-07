import {IconButton, Menu, MenuItem} from "@mui/material";
import {useState} from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Divider from "@mui/material/Divider";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {IPlainDataAction} from "../../../redux/redux-types";
import {useAppDispatch, useAppSelector} from "../../../index";
import {setIsEditRoomTitleModalOpen} from "../../../redux/messenger-menu/messengerMenuActions";
import {setIsAddUserModalOpened, setIsMembersModalOpened} from "../../../redux/messenger-menu/messengerMenuActions";


function MessengerMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useAppDispatch();

    const onMenuItemClick = (dispatchAction: (isOpen: boolean) => IPlainDataAction<boolean>) => {
        setAnchorEl(null);
        dispatch(dispatchAction(true))
    }

    return (
        <div>
            <IconButton onClick={(event: any) => setAnchorEl(event.currentTarget)}>
                <MoreVertIcon/>
            </IconButton>
            <Menu
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
            >

                    <div>
                        <MenuItem onClick={() => onMenuItemClick(setIsEditRoomTitleModalOpen)}>
                            <EditIcon style={{marginRight: '10px'}} fontSize={"medium"}/>
                            Edit Room Title
                        </MenuItem>
                        <MenuItem onClick={() => onMenuItemClick(setIsAddUserModalOpened)}>
                            <AddIcon fontSize={'medium'} style={{marginRight: '10px'}}/>
                            Add members
                        </MenuItem>
                        <MenuItem onClick={() => onMenuItemClick(setIsMembersModalOpened)}>
                            <ListIcon style={{marginRight: '10px'}} fontSize={"medium"}/>
                            Members
                        </MenuItem>
                        {/*<Divider/>*/}
                        {/*<MenuItem onClick={() => {*/}
                        {/*}}>*/}
                        {/*    <ExitToAppIcon style={{marginRight: '10px'}} fontSize={'medium'}/>*/}
                        {/*    Leave room*/}
                        {/*</MenuItem>*/}
                    </div>

                {/*{3 === 3 &&     // if room type is private or current user is room admin*/}
                {/*    <MenuItem onClick={() => {*/}
                {/*    }}>*/}
                {/*        <DeleteOutlineOutlinedIcon style={{marginRight: '10px', color: 'red'}} fontSize={'medium'}/>*/}
                {/*        <span style={{color: 'red'}}>Delete room</span>*/}
                {/*    </MenuItem>*/}
                {/*}*/}
            </Menu>

        </div>
    );
}

export default MessengerMenu;