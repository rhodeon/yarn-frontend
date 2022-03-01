import React, {useEffect, useState} from 'react'
import ChatHeader from "./ChatHeader"
import ChatFooter from "./ChatFooter"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faCheck } from '@fortawesome/free-solid-svg-icons'
import PerfectScrollbar from "react-perfect-scrollbar"
import UnselectedChat from '../../assets/img/unselected-chat.svg'
import {useSelector, connect} from "react-redux"
import {createSocket} from "../../Store/Actions/authAction"
import {getFriends, updateMessages} from "../../Store/Actions/friendAction"
import Empty from "../../utils/Empty"

function Chat(props) {
    const {selectedChat} = useSelector(state => state);

    const [inputMsg, setInputMsg] = useState('');

    const [scrollEl, setScrollEl] = useState();

    useEffect(() => {
        if (scrollEl) {
            scrollEl.scrollTop = scrollEl.scrollHeight;
        }
    }, [scrollEl]);

    useEffect(() => {
        if(props.conn === null){
            props.createSocket(props.uid)
        }
        if(selectedChat.selectedChat.unreadMessages && props.inView){

            props.updateMessages(
                props.conn,
                props.uid,
                selectedChat.selectedChat.ID,
                "read",
                props.inView
            )
        }
    }, [
        props.conn, 
        props.uid, 
        props.inView,
        selectedChat.selectedChat?.ID,
        selectedChat.selectedChat.unreadMessages
    ])

    const messageStatus = (message) =>{
        if(message.sender === props.uid){
            if(!message.delivered && !message.read){
                return <FontAwesomeIcon icon={faCheck} color="#828282"/>
            } else if(message.delivered && !message.read){
                return <FontAwesomeIcon icon={faCheckDouble} color="#828282"/>
            } else {
                return <FontAwesomeIcon icon={faCheckDouble} color="#0a80ff"/>
            }
        } else {
           return null
        }
    }

    const formatTime = (date) =>{
        return new Date(date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }

    const formatDate = (prevDate, date) =>{
        if(new Date(prevDate).getDate() === new Date(date).getDate()){
            return null
        } else {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ]
            const difference = new Date().getDate() - new Date(date).getDate()
            if (difference < 1) {
                return "Today"
            } else if (difference === 1) {
                return "Yesterday"
            } else {
                const d = new Date(date)
                return `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
            }
        }
    }

    const handleSubmit = () => {
        const payload = {
            recipientID: selectedChat.selectedChat.ID,
            sender: props.uid,
            content: inputMsg,
            createdAt : new Date(Date.now())
        }

        // selectedChat.selectedChat.messages.push(inputMsg);
        if(inputMsg !== ""){
            props.conn.send(JSON.stringify(payload))
            setInputMsg("")
        } 
    };

    const handleChange = (newValue) => {
        setInputMsg(newValue);
    };

    useEffect(() => {
        if (scrollEl) {
            setTimeout(() => {
                scrollEl.scrollTop = scrollEl.scrollHeight;
            }, 100)
        }
    });

    const MessagesView = (props) => {
        const {message} = props;
        return <>
            {formatDate(props.prevDate, message.createdAt) ? <div className="message-item messages-divider sticky-top" data-label={formatDate(props.prevDate, message.createdAt)} style={{margin: "30px 0"}}></div> : null}
            <div className={`message-item ${props.uid === message.sender ? "outgoing-message" : ""}`}>
                {
                    message.media
                        ?
                        message.media
                        :
                        <div className="message-content">
                            {message.content}
                        </div>
                }
                <div className="message-avatar">
                    <div className="time">
                        {formatTime(message.createdAt)}
                    </div>
                    <div>
                    {messageStatus(message)}
                    </div>
                </div>
                
            </div>
        </>
    };

    return (
        <div className="chat">
            {
                selectedChat.selectedChat.firstName
                    ?
                    <React.Fragment>
                        <ChatHeader selectedChat={selectedChat.selectedChat}/>
                        <PerfectScrollbar containerRef={ref => setScrollEl(ref)}>
                            <div className="chat-body">
                                <div className="messages">
                                    {
                                        selectedChat.selectedChat.messages
                                            ?
                                            selectedChat.selectedChat.messages.map((message, i) => {
                                                let prevDate = null 
                                                if (i !== 0) {
                                                    prevDate = selectedChat.selectedChat.messages[i-1].createdAt
                                                }
                                                return <MessagesView message={message} key={i} uid={props.uid} prevDate={prevDate}/>
                                            })
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        </PerfectScrollbar>
                        <ChatFooter handleSubmit={handleSubmit} handleChange={handleChange} inputMsg={inputMsg}/>
                    </React.Fragment>
                    :
                    <Empty message="Select a chat to read messages" showImg/>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      conn: state.auth.websocket,
      uid: state.auth.userID,
      inView: state.selectedChat.inView
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      createSocket: (uid) => dispatch(createSocket(uid)),
      getFriends: () => dispatch(getFriends()),
      updateMessages:(conn, recipient, sender, type, inView) => inView ? dispatch(updateMessages(conn, recipient, sender, type, inView)) : null
    }
  }
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Chat)