import React, { useState } from 'react';
import NotesContext from './NotesContext';
import { useNavigate } from 'react-router-dom';


function NoteState(props) {

    const [progress, setProgress] = useState(0);
    const [alert, setAlert] = useState(null);
    let navigate = useNavigate();

    const displayAlert = (data) => {
        if (data.success) {
            setAlert({
                msg: data.message,
                type: 'success',
                symbolId: 'check-circle-fill'
            });
        } else {
            setAlert({
                msg: data.errorMsg,
                type: 'danger',
                symbolId: 'exclamation-triangle-fill'
            });
        }
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    }


    const [notes, setNotes] = useState([]);

    const fetchAllNotes = async () => {
        const fetchNotes = process.env.REACT_APP_URL_END_POINT + process.env.REACT_APP_GET_ALL_NOTES;
        const response = await fetch(fetchNotes, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        setNotes(data);
    }

    const addNote = async (noteDetails) => {
        setProgress(0);
        const addNotes = process.env.REACT_APP_URL_END_POINT + process.env.REACT_APP_ADD_NOTE;
        const response = await fetch(addNotes, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token'),
            },
            body: JSON.stringify(noteDetails),
        });
        setProgress(50);
        const data = await response.json();
        setProgress(100);
        displayAlert(data);
        fetchAllNotes();
    }

    const deleteNote = async (noteId) => {
        setProgress(0);
        const deletenotes = process.env.REACT_APP_URL_END_POINT + process.env.REACT_APP_DELETE_NOTE + noteId;
        const response = await fetch(deletenotes, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token'),
            },
        });
        setProgress(50);
        const data = await response.json();
        setProgress(100);
        displayAlert(data);
        fetchAllNotes();
    }

    const editNote = async (editNoteDetails, noteId) => {
        setProgress(0);
        const updatenotes = process.env.REACT_APP_URL_END_POINT + process.env.REACT_APP_UPDATE_NOTE + noteId;
        const response = await fetch(updatenotes, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token'),
            },
            body: JSON.stringify(editNoteDetails),
        });
        setProgress(50);
        const data = await response.json();
        setProgress(100);
        displayAlert(data);
        fetchAllNotes();
    }

    const userLogin = async (userDetails) => {
        setProgress(0);
        const login = process.env.REACT_APP_URL_END_POINT + process.env.REACT_APP_LOGIN;
        const response = await fetch(login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
        });
        setProgress(50);
        const data = await response.json();
        setProgress(100);
        displayAlert(data);
        if (data.success) {
            localStorage.setItem("token", data.authToken);
            navigate('/');
        }
    }


    const userRegistration = async (userDetails) => {
        setProgress(0);
        const createUser = process.env.REACT_APP_URL_END_POINT + process.env.REACT_APP_REGISTER;
        const response = await fetch(createUser, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails)
        });
        setProgress(50);
        const data = await response.json();
        setProgress(100);
        displayAlert(data);
    }

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: ''
    })

    const getUserData = async () => {
        setProgress(0);
        const getUser = process.env.REACT_APP_URL_END_POINT + process.env.REACT_APP_GET_USER;
        const response = await fetch(getUser, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token'),
            },
        });
        setProgress(50);
        const data = await response.json();
        setUserInfo(data.userData);
        setProgress(100);
    }


    return (
        <NotesContext.Provider value={{ notes, alert, progress, fetchAllNotes, addNote, deleteNote, editNote, userLogin, userRegistration, getUserData, userInfo }}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NoteState
