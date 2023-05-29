import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            navigate("/")
            props.showAlert("Welcome!", "#e3fdfd")
        } else {
            props.showAlert("Invalid Credentials!", "#e4bab2")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                        onChange={onChange}
                        aria-describedby="emailHelp"
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
                    />
                </div>
                <button type="submit" className="btn btn-dark">
                    LOGIN
                </button>
            </form>

        </div>
    )
}

export default Login