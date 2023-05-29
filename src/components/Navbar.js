import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
    let location = useLocation()

    let navStyle = {
        backgroundColor: "#f7e7e7"
    }

    let navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg" style={navStyle}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        JotDown
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">
                                    About
                                </Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                            <Link className="btn btn-outline-secondary mx-2" to="/login" role="button">
                                Login
                            </Link>
                            <Link className="btn btn-outline-secondary mx-2" to="/signup" role="button">
                                Signup
                            </Link>
                        </form> : <button className="btn btn-outline-secondary mx-2" onClick={handleLogout} role="button">
                            Logout
                        </button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar