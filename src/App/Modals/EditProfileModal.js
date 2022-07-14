import React, {useState} from 'react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    InputGroup,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from 'reactstrap';
import * as FeatherIcon from 'react-feather';
import {connect} from "react-redux";
import classnames from 'classnames';
import {getProfile} from "../../Store/Actions/authAction";
import Avatar from "../../utils/Avatar";
import Axios from "../../utils/Axios";

function EditProfileModal(props) {
    const [activeTab, setActiveTab] = useState('1');
    const [username, setUsername] = useState(props.profile.username);
    const [firstName, setFirstName] = useState(props.profile.firstName);
    const [lastName, setLastName] = useState(props.profile.lastName);
    const [about, setAbout] = useState(props.profile.about);
    const [status, setStatus] = useState(props.profile.status);
    const [avatarFile, setAvatarFile] = React.useState(null);

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const submitForm = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("status", status);
        formData.append("about", about);
        formData.append("avatarFile", avatarFile);

        try {
            const response = await Axios({
                method: "post",
                url: "users/profile",
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
                timeout: 10000,
            });
            console.log(response);
            props.getProfile();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Modal isOpen={props.modal} toggle={props.toggle} centered className="modal-dialog-zoom">
                <ModalHeader toggle={props.toggle}>
                    <FeatherIcon.Edit2 className="mr-2"/> Edit Profile
                </ModalHeader>
                <ModalBody>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({active: activeTab === '1'})}
                                onClick={() => {
                                    toggle('1');
                                }}
                            >
                                Personal
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: activeTab === '2'})}
                                onClick={() => {
                                    toggle('2');
                                }}
                            >
                                About
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Form>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <FormGroup>
                                    <Label htmlFor={"username"}>Username</Label>
                                    <Input id={"username"} value={username}
                                           onChange={(e) => setUsername(e.target.value)}/>
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor={"firstName"}>First Name</Label>
                                    <Input id={"firstName"} value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}/>
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor={"lastName"}> Last Name</Label>
                                    <Input id={"lastName"} value={lastName}
                                           onChange={(e) => setLastName(e.target.value)}/>
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor={"status"}>Status</Label>
                                    <Input id={"status"} value={status} onChange={(e) => setStatus(e.target.value)}/>
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor={"avatar"}>Avatar</Label>
                                    <InputGroup id={"avatar"}>
                                        <div>
                                            <Avatar source={props.profile.avatar}/>
                                        </div>
                                        <Input type="file" accept="image/png, image/jpeg"
                                               onChange={(e) => setAvatarFile(e.target.files[0])}/>
                                    </InputGroup>
                                </FormGroup>
                            </TabPane>

                            <TabPane tabId="2">
                                <FormGroup>
                                    <Label htmlFor={"about"}>Write a few words that describe you</Label>
                                    <Input id={"about"} type="textarea" onChange={(e) => setAbout(e.target.value)}
                                           value={about}/>
                                </FormGroup>
                            </TabPane>
                        </TabContent>
                    </Form>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={(e) => submitForm(e)}>Save</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        profile: state.auth.profile,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProfile: () => dispatch(getProfile())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileModal);
