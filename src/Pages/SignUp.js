import React, {useEffect, useState} from "react"
import Logo from "../Icons/logo"
import axios from "axios"
import Error from "../utils/Error"
import {Link, useNavigate} from "react-router-dom"
import {connect} from "react-redux"
import Loader from "../utils/Loader"
import {authSuccess, checkAuthTimeout, storeAuth} from "../Store/Actions/authAction"
import Profile from "../Models/profile";

function SignUp(props) {

    const navigate = useNavigate()

    useEffect(() => {
        document.body.classList.add('form-membership')
        if (props.isAuth) {
            navigate("/")
        }
    }, []);
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")

    const submitForm = async () =>{
        setLoading(true)
        setError(null)
        const payload = {
            firstName: firstName,
            lastName: lastName,
            password: password,
            username: username.toLowerCase().trim(),
            email: email.toLowerCase().trim()
        }
        try {
            const response = await axios.post("http://localhost:8000/users/signup", payload)
            const profile = new Profile(response.data.profile)
            props.authSuccess(response.data.accessToken, response.data.userID, response.data.refreshToken, profile, response.data.expiresAt)
            storeAuth(
                response.data.accessToken,
                response.data.refreshToken,
                response.data.expiresAt,
                profile,
                response.data.userID
            )
            props.checkAuthTimeout(response.data.expiresAt)
            setLoading(false)
            navigate("/")
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    
    return (
        <div className="form-wrapper">
            <div className="logo">
                <Logo/>
            </div>
            <h5>Create account</h5>
            <Error error={error}/>
            <form
                onSubmit={(e)=>{
                    e.preventDefault()
                    submitForm()
                }}
            >
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Firstname" 
                        required 
                        autoFocus
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Lastname" 
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Confirm password" 
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Username" 
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary btn-block">{loading ? <Loader/> : "Register"}</button>
                <hr/>
                <p className="text-muted">Already have an account?</p>
                <Link to="/sign-in" className="btn btn-outline-light btn-sm">Sign in!</Link>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      isAuth : state.auth.token ? true : false,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      authSuccess: ( token, userID, refreshToken, profile) => dispatch(authSuccess(token, userID, refreshToken, profile)),
      checkAuthTimeout: (time) => dispatch(checkAuthTimeout(time))
    }
  }
  
  
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

