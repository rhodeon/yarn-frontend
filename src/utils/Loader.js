import React from 'react'

const Loader = ({small, primary}) => {
  return (
    <div className={`spinner-border ${small ? "spinner-border-sm" : ""} text-${primary ? "primary" : "light"}`}>
        <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Loader
