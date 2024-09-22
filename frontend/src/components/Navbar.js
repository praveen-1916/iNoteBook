import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import NotesContext from '../context/NotesContext';


function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const logoutUser = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const context = useContext(NotesContext);
    const { progress } = context;

    return (
        <>
            <LoadingBar color='#0D6EFD' progress={progress} height={3} />
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={location.pathname === '/' ? "nav-link active" : "nav-link"} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={location.pathname === '/about' ? "nav-link active" : "nav-link"} to="/about">About Us</Link>
                            </li>
                        </ul>

                        <div className='me-5'>
                            <Link to='/UserData'><i className="fa-solid fa-user fs-5"></i></Link>
                        </div>
                        {!localStorage.getItem('token') ? <form className="d-flex">
                            <Link className="btn btn-primary" to="/login">Login</Link>
                            <Link className="btn btn-primary ms-2" to="/register">SignUp</Link>
                        </form> : <button className='btn btn-primary' onClick={logoutUser}>Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
