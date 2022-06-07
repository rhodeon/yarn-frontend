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
import Error from "../../utils/Error"
import Loader from "../../utils/Loader"

// Feather icon
import * as FeatherIcon from 'react-feather';
import axios from 'axios';

function AddFriendModal() {
    const [modal, setModal] = useState(false);

    const [username, setUsername] = useState("");

    const [error, setError] = useState(null);

    const [success, setSuccess] = useState(false);

    const [loading, setLoading] = useState(false);
        
    const modalToggle = () => setModal(!modal);

    const {auth} = useSelector(state => state);

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

    const submitForm = async() =>{
        setSuccess(false)
        setLoading(true)
        const payload = {
            username: username.toLowerCase().trim()
        }
        const options = {
            headers:{
                Authorization: auth.token
            }
        }
        try {
            await axios.post("http://localhost:8000/users/request", payload, options)
            setSuccess(true)
            setError(null)
            setUsername("")
            setLoading(false)
        } catch (error) {
            setError(error)
            setSuccess(null)
            setLoading(false)
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
                    {success ? <Alert color="success">Friend request successfully sent.</Alert> : null}
                    <Error error={error}/>
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
                    <Button color="primary" onClick={submitForm}>{loading ? <Loader/> : "Submit"}</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default AddFriendModal
