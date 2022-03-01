import React, {useEffect, useState} from "react"
import Logo from "../Icons/logo"
import {Link, useNavigate} from "react-router-dom"
import {connect} from "react-redux"
import * as actions from "../Store/Actions/authAction"
import Loader from "../utils/Loader"
import Error from "../utils/Error"

function SignIn(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => document.body.classList.add('form-membership'), []);
    if (props.isAuth) {
        navigate("/")
    }

    return (
        <div className="form-wrapper">
            <div className="logo">
                <Logo/>
            </div>
            <h5>Sign in</h5>
            <Error error={props.error}></Error>
            <form
                onSubmit={(e)=>{
                    e.preventDefault()
                    if (!props.loading) {
                        props.login(email, password)
                    }
                }}
            >
                <div className="form-group">
                    <input 
                        type="text" 
                        name="email"
                        value={email} 
                        className="form-control" 
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        name="password"
                        value={password} 
                        className="form-control" 
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group d-flex justify-content-between">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" checked="" id="customCheck1"/>
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                    <Link to="/reset-password">Reset password</Link>
                </div>
                <button className="btn btn-primary btn-block">{props.loading ? <Loader /> : "Sign in"}
                </button>
                <hr/>
                <hr/>
                <p className="text-muted">Don't have an account?</p>
                <Link to="/sign-up" className="btn btn-outline-light btn-sm">Register now!</Link>
            </form>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      isAuth : state.auth.token ? true : false,
      loading : state.auth.loading,
      error: state.auth.error,
      redirect: state.auth.authRedirectPath
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      login: ( email, password ) => dispatch(actions.auth(email, password)),
    }
  }
  
  
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
