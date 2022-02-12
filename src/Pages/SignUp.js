import React, {useEffect, useState} from "react"
import Logo from "../Icons/logo"
import axios from "axios"
import {Link} from "react-router-dom"

function SignUp() {

    useEffect(() => document.body.classList.add('form-membership'), []);
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const submitForm = async () =>{
        const payload = {
            firstName: firstName,
            lastName: lastName,
            password: password,
            username: username,
            email: email
        }
        try {
            const response = await axios.post("http://localhost:8000/users/signup", payload)
            console.log(response.data);
        } catch (error) {
            let err = new Error(error);
            if (error.response) {
                err = error.response.data
            }
        }
    }

    
    return (
        <div className="form-wrapper">
            <div className="logo">
                <Logo/>
            </div>
            <h5>Create account</h5>
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
                <button className="btn btn-primary btn-block">Register</button>
                <hr/>
                <p className="text-muted">Already have an account?</p>
                <Link to="/sign-in" className="btn btn-outline-light btn-sm">Sign in!</Link>
            </form>
        </div>
    )
}

export default SignUp
