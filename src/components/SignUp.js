import React, { useContext, useState } from 'react'
import NotesContext from '../context/NotesContext';

function SignUp() {
    const context = useContext(NotesContext);
    const { userRegistration } = context;


    const [inputPass, setInputPass] = useState({ type: 'password', showHideText: 'Show Password' });
    const showPass = () => {
        if (inputPass.type === 'password') {
            setInputPass({ type: 'text', showHideText: 'Hide Password' });
        } else {
            setInputPass({ type: "password", showHideText: 'Show Password' });
        }
    }

    const [userDetails, setUserDetails] = useState({
        name: '',
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
        console.log(e);
        e.preventDefault();
        userRegistration(userDetails);
        setUserDetails({
            name: '',
            email: '',
            password: ''
        })
    }

    return (
        <div className='container d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
            <div className="w-50">
                <form className='p-4 border border-2 rounded border-primary' onSubmit={formSubmit}>
                    <h4 className='text-center fw-bolder pb-3 text-primary border-2 border-primary border-bottom'>Create Account To Use iNoteBook</h4>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label fw-bolder fs-5 text-primary">Name</label>
                        <input type="text" name='name' value={userDetails.name} required minLength={3} className="form-control" onChange={onChange} id="exampleInputName" />
                    </div>
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
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp
