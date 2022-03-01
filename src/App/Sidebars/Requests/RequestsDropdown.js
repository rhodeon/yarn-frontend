import React, {useState} from 'react'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import * as FeatherIcon from 'react-feather'
import Loader from "../../../utils/Loader"
import Axios from "../../../utils/Axios"

const RequestsDropdown = ({received, ID, fetch}) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const accept = async (ID) =>{
        setLoading(true)
        const payload = {
            id: ID
        }
        try {
            const response = await Axios.post("users/request/accept", payload)
            console.log(response);
            setLoading(false)
            fetch()
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
        
    }

    const cancel = async (ID) =>{
        setLoading(true)
        const payload = {
            ID: ID
        }
        try {
            const response = await Axios.post("users/request/delete", payload)
            console.log(response);
            setLoading(false)
            fetch()
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
        
    }
    


    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle tag="span">
                {loading ? <Loader small primary/> : <FeatherIcon.MoreHorizontal/> }
            </DropdownToggle>
            <DropdownMenu>
                {received ? <><DropdownItem onClick={() => accept(ID)}>Accept</DropdownItem>
                <DropdownItem onClick={() => cancel(ID)}>Refuse</DropdownItem></> : <DropdownItem onClick={() => cancel(ID)}>Delete</DropdownItem>}
            </DropdownMenu>
        </Dropdown>
    )
};

export default RequestsDropdown
