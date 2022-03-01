
export const getFriends = () =>{
    return async dispatch => {
        try {
            dispatch({type:"GET_FRIENDS_START"})
            const response = await fetch("http://192.168.43.236:8000/friends", {
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token")
                }
            })
            let data = await response.json()
            if (!data) {
                data = []
            }
            dispatch({type:"GET_FRIENDS_SUCCESS", payload:data})
        } catch (error) {
            dispatch({type:"DISCONNECTED", status:true})
            dispatch({type:"GET_FRIENDS_FAIL", payload:error})
            
        }
    }
}

export const updateMessages = (conn, sender, recipient, type) => {
    
    return async dispatch => {
        const payload = {
            sender: sender,
            recipientID: recipient,
            messageType: "info",
            updateType: type
        }
        conn.send(JSON.stringify(payload))
        dispatch({type:"DELIVERY_REPORT_SENT"})
    }

}