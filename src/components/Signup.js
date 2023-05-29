import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup(props) {
    const [credentials, setCredentials] = useState({ name: "", username: "", email: "", password: "", cpassword: "" })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, username, password } = credentials
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ name, username, email, password })
        })
        const json = await response.json()
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            navigate("/")
            props.showAlert("Account Created Successfully!", "#e3fdfd")
        } else {
            props.showAlert("Invalid Details!", "#e4bab2")
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={credentials.name}
                        aria-describedby="emailHelp"
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={credentials.email}
                        aria-describedby="emailHelp"
                        onChange={onChange}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Choose a username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={credentials.username}
                        aria-describedby="emailHelp"
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
                        required
                        minLength={8}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="cpassword"
                        name="cpassword"
                        value={credentials.cpassword}
                        onChange={onChange}
                        required
                        minLength={8}
                    />
                </div>
                <button type="submit" className="btn btn-dark">
                    SIGNUP
                </button>
            </form>

        </div>
    )
}

export default Signup