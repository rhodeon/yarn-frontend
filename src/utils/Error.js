import React from 'react'
import {Alert} from "reactstrap"

const ErrorAlert = ({error, children}) => {
        let err = new Error(error);
        if (error?.response) {
            err.message = error.response.data.error
        }
        err.message = err.message === "null" ? null : err.message
  return (
    <>
      {err?.message ? <div>
            <Alert
                color="danger"
                dismissible
            >
                {err.message}
            </Alert>
        </div> : children}
    </>
  )
}

export default ErrorAlert
