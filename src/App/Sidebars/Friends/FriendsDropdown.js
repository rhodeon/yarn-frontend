import React, {useState} from 'react'
import {useDispatch} from "react-redux"
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import * as FeatherIcon from 'react-feather'
import {mobileProfileAction} from "../../../Store/Actions/mobileProfileAction"
import {selectedChatAction} from "../../../Store/Actions/selectedChatAction"
import {profileAction, selectedProfile} from "../../../Store/Actions/profileAction"

const FriendsDropdown = ({profile}) => {

    const dispatch = useDispatch();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const profileActions = () => {
        dispatch(profileAction(true));
        dispatch(mobileProfileAction(true))
        dispatch(selectedProfile(profile))
    };

        const chatSelectHandle = (chat) => {
        chat.unread_messages = 0;
        dispatch(selectedChatAction(chat));
        document.querySelector('.chat').classList.add('open');
    };

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle tag="span">
                <FeatherIcon.MoreHorizontal/>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={() => chatSelectHandle(profile)}>New chat</DropdownItem>
                <DropdownItem onClick={profileActions}>Profile</DropdownItem>
                <DropdownItem divider/>
                <DropdownItem>Block</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
};

export default FriendsDropdown
