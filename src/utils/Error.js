import React from 'react'
import {Alert} from "reactstrap"

const ErrorAlert = ({error, children}) => {
        let err = new Error(error);
        if (error?.response) {
            err = error.response.data
        }
  return (
    <>
      {err?.error ? <div>
            <Alert
                color="danger"
                dismissible
            >
                {err.error}
            </Alert>
        </div> : children}
    </>
  )
}

export default ErrorAlert
