import React, { useContext, useEffect } from 'react';
import './list.css';
import { useNavigate } from 'react-router-dom';
import NotesContext from '../context/NotesContext';


function UserAccount() {

    const context = useContext(NotesContext);
    const { getUserData, userInfo } = context;

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUserData();
        } else {
            navigate('/login')
        }
        //eslint-disable-next-line
    }, [])

    const logoutUser = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }


    return (
        <div className='container'>
            <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="d-flex flex-column col-md-3 p-3 rounded-start text-bg-light" style={{ height: '75vh' }}>
                    <h4 className='fw-bolder'>Account</h4>
                    <p className='text-muted'>Manage your account info.</p>
                    <ul className="list-group mt-4" id="list-tab" role="tablist">
                        <li className="list-group-item rounded-1 fw-bolder list-group-item-action active" id="list-home-list" data-bs-toggle="list" data-bs-target="#list-home" role="tab" ><i className="fa-solid fa-id-badge me-2"></i>Profile</li>
                        <li className="list-group-item rounded-1 fw-bolder list-group-item-action" id="list-profile-list" data-bs-toggle="list" data-bs-target="#list-profile" role="tab" ><i className="fa-solid fa-shield-halved me-2"></i>Security</li>
                    </ul >
                    <div className='mt-auto'>
                        <button className='btn btn-primary' onClick={logoutUser}>Logout</button>
                    </div>
                </div>
                <div className="col-md-5 p-3 rounded-end text-bg-primary" style={{ height: '75vh' }}>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                            <div className='h4 text-center fw-bolder' style={{ letterSpacing: '0.5px' }}>Profile details</div>
                            <hr />
                            <div className='d-flex align-items-center justify-content-around fw-bolder'>
                                <p className='fs-5'>Name</p>
                                <div className='d-flex align-items-center gap-3'>
                                    <i className="fa-solid fa-user fs-5"></i>
                                    <p className='fs-4'>{userInfo.name}</p>
                                </div>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-around '>
                                <p className='fs-6 fw-bolder'>Email adresses</p>
                                <div className='d-flex flex-column'>
                                    <p className=''>{userInfo.email}<span className="badge ms-2 text-bg-dark">Primary</span></p>
                                    <p>abcd@gmail.com</p>
                                    <p>vxyz@gmail.com</p>
                                </div>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-around '>
                                <p className='fs-6 fw-bolder'>Phone Number</p>
                                <div className='d-flex flex-column'>
                                    <p className=''>+91 67547337642<span className="badge ms-2 text-bg-dark">Primary</span></p>
                                    <p>+12 8975875894</p>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                            <div className='h5 text-center fw-bolder' style={{ letterSpacing: '0.5px' }}>Privacy & Security</div>
                            <hr />
                            <div className='d-flex gap-5'>
                                <p className='fs-6 fw-bolder'>Privacy</p>
                                <p>We take all reasonable precautions to protect your Personal Information from any loss or unauthorized use, access or disclousure.</p>
                            </div>
                            <hr />
                            <div className='d-flex gap-5 '>
                                <p className='fs-6 fw-bolder'>Security</p>
                                <p>The security of our data and the data of our customers and partners is a high priority for us. We take targeted measures to ensure that all data provided to us is processed and stored securely.</p>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAccount
