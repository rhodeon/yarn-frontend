import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"

import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import LockScreen from "./Pages/LockScreen"
import ResetPassword from "./Pages/ResetPassword"
import PhoneCode from "./Pages/PhoneCode"
import Layout from "./App/Layout"
import {connect} from "react-redux"
import * as authActions from "./Store/Actions/authAction"


function App(props) {
    props.checkAuthState()

    return (
        <Router>
            <Routes>
                <Route path="/sign-in" element={<SignIn/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/lock-screen" element={<LockScreen/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="/phone-code" element={<PhoneCode/>}/>
                <Route path="/" element={<Layout/>}/>
            </Routes>
        </Router>
    )
}

const mapDispatchToProps = dispatch => {
    return {
      checkAuthState: () => dispatch(authActions.authCheckState()),
    }
  }
  
  const mapStateToProps = state =>{
    return{
      token: state.auth.token,
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(App)
