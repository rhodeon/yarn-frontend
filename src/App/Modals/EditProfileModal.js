import React, {useState} from 'react'
import {
    Modal,
    ModalBody,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    ModalHeader,
    Input,
    InputGroup,
} from 'reactstrap'
import * as FeatherIcon from 'react-feather'
import {connect} from "react-redux"
import axios from "axios"
import classnames from 'classnames'
import {getProfile} from "../../Store/Actions/authAction"
import Avatar from "../../utils/Avatar"

function EditProfileModal(props) {
    const [activeTab, setActiveTab] = useState('1');
    const [status, setStatus] = useState(props.profile.status);
    const [about, setAbout] = useState(props.profile.about);
    const [city, setCity] = useState(props.profile.city);
    const [selectedFile, setSelectedFile] = React.useState(null);

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const submitForm = async(event) =>{
        event.preventDefault()
        const formData = new FormData();
        formData.append("selectedFile", selectedFile);
        formData.append("status", status);
        formData.append("about", about);
        formData.append("city", city);
        try {
          const response = await axios({
            method: "post",
            url: "http://localhost:8000/users/profile",
            data: formData,
            headers: { "Content-Type": "multipart/form-data", Authorization: props.token},
          });
          console.log(response);
          props.getProfile()
        } catch(error) {
          console.log(error)
        }
      }

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
                                    <Label for="fullname">Fullname</Label>
                                    <InputGroup>
                                        <Input value={props.profile.firstName + " " + props.profile.lastName} readOnly/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fullname">Status</Label>
                                    <InputGroup>
                                        <Input value={status} onChange={(e) => setStatus(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="avatar">Avatar</Label>
                                    <InputGroup>
                                            <div>
                                                <Avatar source={props.profile.avatar}/>
                                            </div>
                                            <Input type="file" accept="image/png, image/jpeg" onChange={(e) => setSelectedFile(e.target.files[0])}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="city">City</Label>
                                    <InputGroup>
                                        <Input type="text" onChange={(e) => setCity(e.target.value)} value={city} placeholder="Ex: Columbia"/>
                                    </InputGroup>
                                </FormGroup>
                            </TabPane>
                            <TabPane tabId="2">
                                <FormGroup>
                                    <Label for="about">Write a few words that describe you</Label>
                                    <Input type="textarea" onChange={(e) => setAbout(e.target.value)} value={about}/>
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
    )
}

const mapStateToProps = (state) => {
    return {
      profile : state.auth.profile,
      token: state.auth.token

    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        getProfile: () => dispatch(getProfile())
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditProfileModal)
