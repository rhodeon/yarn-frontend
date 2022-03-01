import React from 'react'
import UnselectedChat from "../assets/img/unselected-chat.svg"

const Empty = ({message, showImg}) => {
    return (
        <div className="chat-body no-message">
            <div className="no-message-container">
                <div className="row mb-5">
                    {showImg ? <img src={UnselectedChat} width={200} className="img-fluid" alt="unselected"/> : null}
                </div>
                <p className="lead text-center">{message}</p>
            </div>
        </div>
    )
}

export default Empty