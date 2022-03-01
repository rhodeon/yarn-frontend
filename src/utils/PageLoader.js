import React from 'react'


const PageLoader = ({loading, children}) => {
  return (
    <>  
    {loading ? <div className="spinner-border text-primary" style={{margin:"100px auto", height: "3rem", width:"3rem"}}>
        <span className="sr-only">Loading...</span>
    </div> : children}
    </>
  )
}

export default PageLoader
