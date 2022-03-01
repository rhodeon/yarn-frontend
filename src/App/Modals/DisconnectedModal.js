import React, {useEffect, useState} from 'react'
import {Button, Col, Modal, ModalBody, ModalFooter, Row} from "reactstrap";
import {connect, dispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import disconnected from "../../assets/img/disconnected.png"
import {disconnectedAction} from "../../Store/Actions/disconnectedAction"
import {getFriends} from "../../Store/Actions/friendAction"
import {logout, createSocket} from "../../Store/Actions/authAction"
import Loader from "../../utils/Loader"

// import {ReactComponent as DisconnectedSvg} from "../../assets/img/disconnected.svg";

function DisconnectedModal(props) {
    // useEffect(() => {
    //     let getDemoParam = (window.location.search).replace('?demo=', '');
    //     if (getDemoParam === 'disconnected') {
    //         toggle()
    //     }
    // }, []);

    const click = () =>{
        props.getFriends()
        props.createSocket(props.uid)
    }
    const navigate = useNavigate()

    return (
        <Modal isOpen={props.isOpen} size="lg" centered backdrop="static"
               className="modal-dialog-zoom">
            <ModalBody>
                <Row>
                    
                    <Col md={{size: 6, offset: 3}}>
                        <img src={disconnected} style={{width:"inherit"}}/>
                        
                    </Col>
                    <p className="lead mt-5 text-center">Application disconnected. Make sure you have an active Internet connection.</p>
                </Row>
            </ModalBody>
            <ModalFooter className="justify-content-center">
                <Button color="success" size="lg"
                        onClick={click} disabled={props.loading}>{props.loading ? <Loader/> : "Reconnect"}</Button>{' '}
                <Button color="danger"  size="lg"onClick={()=>{
                    props.logout()
                    navigate("/sign-in")
                }}>Logout</Button>
            </ModalFooter>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
      isOpen : state.disconnected,
      loading: state.auth.socketLoading || state.friends.loading,
      uid: state.auth.userID

    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        setModal: (status) => dispatch(disconnectedAction(status)),
        getFriends: () => dispatch(getFriends()),
        createSocket: (uid) => dispatch(createSocket(uid)),
        logout: () => dispatch(logout()) 
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(DisconnectedModal)