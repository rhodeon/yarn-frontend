import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector, connect} from "react-redux"
import * as FeatherIcon from 'react-feather'
import {Tooltip} from 'reactstrap'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import AddGroupModal from "../../Modals/AddGroupModal"
import ChatsDropdown from "./ChatsDropdown"
import {sidebarAction} from "../../../Store/Actions/sidebarAction"
import {selectedChatAction} from "../../../Store/Actions/selectedChatAction";
import {updateMessages} from "../../../Store/Actions/friendAction";
import Avatar from "../../../utils/Avatar"
import Empty from "../../../utils/Empty"
import * as actions from "../../../Store/Actions/friendAction"

function Index(props) {
    const dispatch = useDispatch();
    
    const {selectedChat, auth} = useSelector(state => state);

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    const chatSelectHandle = (chat) => {
        dispatch(selectedChatAction(chat));
        document.querySelector('.chat').classList.add('open');
    };

    useEffect(() =>{
        props.getFriends()
    },[window.location.href])

    useEffect(() => {
        if(!props.friends){
            return props.getFriends()
        }
        props.friends.forEach(friend => {
            if(friend.messages){
                if (!friend.messages[friend.messages.length - 1].delivered
                     && friend.messages[friend.messages.length - 1].sender !== props.uid) {
                    props.updateMessages(
                        props.conn,
                        props.uid,
                        friend.ID,
                        "delivered"
                    )
                }
            }
        });
    },[props.friends, props.conn, props.uid])



    // useEffect(() => {
    //     const payload = {
    //         auth: auth.token
    //     }
    //     const createConn = async() =>{
    //       const conn = new WebSocket("ws://localhost:8000/ws")
    //       conn.onopen = () =>{
    //           conn.send(JSON.stringify(payload))
    //       }
    //     } 
    //     createConn()
    //   }, [])
    const formatTime = (date) =>{
        return new Date(date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }

    const mobileMenuBtn = () => document.body.classList.toggle('navigation-open');

    const ChatListView = ({chat}) => {
        return <li className={"list-group-item " + (chat.ID === selectedChat.selectedChat.ID ? 'open-chat' : '')}
                  onClick={() => chatSelectHandle(chat)}>
                <Avatar source={chat.avatarURL}/>
            <div className="users-list-body">
                <div>
                    <h5 className={chat.unreadMessages ? 'text-primary' : ''}>{chat.firstName + " " + chat.lastName}</h5>
                    {chat.messages[chat.messages.length-1].content}
                </div>
                <div className="users-list-action">
                    {chat.unreadMessages ? <div className="new-message-count">{chat.unreadMessages}</div> : ''}
                    <small className={chat.unreadMessages ? 'text-primary' : 'text-muted'}>{formatTime(chat.messages[chat.messages.length - 1].createdAt)}</small>
                    <div className="action-toggle">
                        <ChatsDropdown/>
                    </div>
                </div>
            </div>
        </li>
    };
    let friends = !props.friends ? [] : props.friends
    friends = friends.filter(chat => chat.messages && chat.messages !== []).sort((a,b) =>{
        const date1 = new Date(a.messages[a.messages.length - 1].createdAt)
        const date2 = new Date(b.messages[b.messages.length - 1].createdAt)
        return date2 - date1
    })
    const chatList = friends.map((chat, i) => <ChatListView chat={chat} key={i}/>)

    return (
        <div className="sidebar active">
            <header>
                <div className="d-flex align-items-center">
                    <button onClick={mobileMenuBtn} className="btn btn-outline-light mobile-navigation-button mr-3 d-xl-none d-inline">
                        <FeatherIcon.Menu/>
                    </button>
                    <span className="sidebar-title">Chats</span>
                </div>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <AddGroupModal/>
                    </li>
                    <li className="list-inline-item">
                        <button onClick={() => dispatch(sidebarAction('Friends'))} className="btn btn-outline-light"
                                id="Tooltip-New-Chat">
                            <FeatherIcon.PlusCircle/>
                        </button>
                        <Tooltip
                            placement="bottom"
                            isOpen={tooltipOpen}
                            target={"Tooltip-New-Chat"}
                            toggle={toggle}>
                            New chat
                        </Tooltip>
                    </li>
                </ul>
            </header>
            <form>
                <input type="text" className="form-control" placeholder="Search chats"/>
            </form>
            <div className="sidebar-body">
                <PerfectScrollbar>
                {chatList.length > 0 ? <ul className="list-group list-group-flush">
                        {chatList}
                    </ul> : <Empty message={
                        <span>No chat found. Click <FeatherIcon.PlusCircle/> to start a chat</span>
                    }/>}
                </PerfectScrollbar>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      friends : state.friends.friends,
      loading: state.friends.loading,
      error: state.friends.error,
      uid : state.auth.userID,
      conn: state.auth.websocket
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      getFriends:() => dispatch(actions.getFriends()),
      updateMessages:(conn, recipient, sender, type) => dispatch(updateMessages(conn, recipient, sender, type))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Index)
