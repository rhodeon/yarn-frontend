import React from 'react'
import avatar from "../assets/img/avatar.png"

const Avatar = ({source}) => {
  return (
    <>
        {source !== "" ? <figure className="avatar">
            <img src={source} className="rounded-circle" alt="avatar"/>
        </figure> : <figure className="avatar">
            <img src={avatar} className="rounded-circle" alt="avatar"/>
        </figure>}
    </>
  )
}

export default Avatar
