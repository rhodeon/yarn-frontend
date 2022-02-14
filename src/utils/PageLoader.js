import React from 'react'


const PageLoader = ({loading, children}) => {
  return (
    <>  
    {loading ? <div className="spinner-border text-primary" style={{margin:"100px auto"}}>
        <span className="sr-only">Loading...</span>
    </div> : children}
    </>
  )
}

export default PageLoader
