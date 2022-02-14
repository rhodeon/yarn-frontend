import React, {useState} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Tooltip,
    Alert,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import {useSelector} from "react-redux"

// Feather icon
import * as FeatherIcon from 'react-feather';
import axios from 'axios';

function AddFriendModal() {
    const [modal, setModal] = useState(false);

    const [username, setUsername] = useState("");

    const modalToggle = () => setModal(!modal);

    const {auth} = useSelector(state => state);

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

    const submitForm = async() =>{
        const payload = {
            username: username.toLowerCase()
        }
        const options = {
            headers:{
                Authorization: auth.token
            }
        }
        try {
            const response = await axios.post("http://localhost:8000/users/request", payload, options)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button className="btn btn-outline-light" onClick={modalToggle} id="Tooltip-Add-Friend">
                <FeatherIcon.UserPlus/>
            </button>
            <Tooltip
                placement="bottom"
                isOpen={tooltipOpen}
                target={"Tooltip-Add-Friend"}
                toggle={tooltipToggle}>
                Add Friend
            </Tooltip>
            <Modal className="modal-dialog-zoom" isOpen={modal} toggle={modalToggle} centered>
                <ModalHeader toggle={modalToggle}>
                    <FeatherIcon.UserPlus className="mr-2"/> Add Friends
                </ModalHeader>
                <ModalBody>
                    <Alert color="info">Send friend request</Alert>
                    <Form
                        onSubmit={(e) =>{
                            e.preventDefault()
                            submitForm()
                        }}
                    >
                        <FormGroup>
                            <Label for="email">Username</Label>
                            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={submitForm}>Submit</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default AddFriendModal
