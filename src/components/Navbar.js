import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>


                    </ul>

                    {!localStorage.getItem('token') ? <form className="d-flex">
                        <Link className="btn btn-primary" to="/login">Login</Link>
                        <Link className="btn btn-primary ms-2" to="/register">SignUp</Link>
                    </form> : <button className='btn btn-primary' onClick={logoutUser}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
