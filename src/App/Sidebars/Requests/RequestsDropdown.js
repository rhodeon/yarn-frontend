import React, {useState} from 'react'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import * as FeatherIcon from 'react-feather'

const RequestsDropdown = ({received}) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle tag="span">
                <FeatherIcon.MoreHorizontal/>
            </DropdownToggle>
            <DropdownMenu>
                {received ? <><DropdownItem>Accept</DropdownItem>
                <DropdownItem>Refuse</DropdownItem></> : <DropdownItem>Cancel</DropdownItem>}
            </DropdownMenu>
        </Dropdown>
    )
};

export default RequestsDropdown
