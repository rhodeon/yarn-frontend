import React,{useState} from 'react'
import {Button, Input} from 'reactstrap'
import * as FeatherIcon from 'react-feather'
import WomenAvatar5 from "../../assets/img/avatar.png";

function ChatFooter(props) {

    const [message, setMessage] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({
            name: 'Mirabelle Tow',
            avatar: <figure className="avatar">
                <img src={WomenAvatar5} className="rounded-circle" alt="avatar"/>
            </figure>,
            text: props.inputMsg,
            date: 'Now',
            type: 'outgoing-message'
        })
    };


    return (
        <div className="chat-footer">
            <form onSubmit={handleSubmit}>
                <div>
                    <Button color="light" className="mr-3" title="Emoji">
                        <FeatherIcon.Smile/>
                    </Button>
                </div>
                <Input type="text" className="form-control" placeholder="Write a message." value={message}
                       onChange={(e) => setMessage(e.target.value)}/>
                <div className="form-buttons">
                    {/* <Button color="light">
                        <FeatherIcon.Paperclip/>
                    </Button> */}
                   {!(message.length > 0) ? <Button color="primary">
                        <FeatherIcon.Mic/>
                    </Button> :
                    <Button color="primary">
                        <FeatherIcon.Send/>
                    </Button>}
                </div>
            </form>
        </div>
    )
}

export default ChatFooter
