import React, { useContext, useState } from 'react'
import NotesContext from '../context/NotesContext';
import { Link } from 'react-router-dom';

function Login() {

    const context = useContext(NotesContext);
    const { userLogin } = context;


    const [inputPass, setInputPass] = useState({ type: 'password', showHideText: 'Show Password' });
    const showPass = () => {
        if (inputPass.type === 'password') {
            setInputPass({ type: 'text', showHideText: 'Hide Password' });
        } else {
            setInputPass({ type: "password", showHideText: 'Show Password' });
        }
    }

    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    })

    const onChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value,
        })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        userLogin(userDetails);
        setUserDetails({
            email: '',
            password: ''
        });
    }

    return (
        <div className='container d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
            <div className="w-50">
                <form className='p-4 border border-2 rounded border-primary' onSubmit={formSubmit}>
                    <h4 className='text-center fw-bolder pb-3 text-primary border-2 border-primary border-bottom'>Login Your Account</h4>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bolder fs-5 text-primary">Email address</label>
                        <input type="email" name='email' value={userDetails.email} required className="form-control" onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label fw-bolder fs-5 text-primary">Password</label>
                        <input type={inputPass.type} name='password' value={userDetails.password} required minLength={5} className="form-control" onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" onClick={showPass} className="form-check-input text-primary" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">{inputPass.showHideText}</label>
                    </div>
                    <div className='d-flex gap-3 align-items-center'>
                        <button type="submit" className="btn btn-primary">Login</button>
                        <p className='m-0'>Don't have an account? <Link className="link-primary link-opacity-75 link-opacity-100-hover link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover" to="/register">Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login