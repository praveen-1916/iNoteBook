import React, { useState } from 'react';
import NotesContext from './NotesContext';
import { useNavigate } from 'react-router-dom';


function NoteState(props) {

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

    const MyWebpage = {
        URL_END_POINT: 'http://localhost:4000/',
        METHODS: {
            GET_ALL_NOTES: 'notes/fetchallnotes',
            ADD_NOTE: 'notes/addnotes',
            UPDATE_NOTE: 'notes/updatenotes/',
            DELETE_NOTE: 'notes/deletenotes/',
            LOGIN: 'auth/login',
            REGISTER: 'auth/createuser',

        }
    }
    const [notes, setNotes] = useState([]);

    const fetchAllNotes = async () => {
        const fetchNotes = MyWebpage.URL_END_POINT + MyWebpage.METHODS.GET_ALL_NOTES;
        const response = await fetch(fetchNotes, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        setNotes(data)
        console.log(data);
    }

    const addNote = async (noteDetails) => {
        const addNotes = MyWebpage.URL_END_POINT + MyWebpage.METHODS.ADD_NOTE;
        const response = await fetch(addNotes, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token'),
            },
            body: JSON.stringify(noteDetails),
        });
        const data = await response.json();
        displayAlert(data);
        fetchAllNotes();
    }

    const deleteNote = async (noteId) => {
        const deletenotes = MyWebpage.URL_END_POINT + MyWebpage.METHODS.DELETE_NOTE + noteId;
        const response = await fetch(deletenotes, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token'),

            },
        });
        const data = await response.json();
        displayAlert(data);
        fetchAllNotes();
    }

    const editNote = async (editNoteDetails, noteId) => {
        const updatenotes = MyWebpage.URL_END_POINT + MyWebpage.METHODS.UPDATE_NOTE + noteId;
        const response = await fetch(updatenotes, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token'),
            },
            body: JSON.stringify(editNoteDetails),
        });
        const data = await response.json();
        displayAlert(data);
        fetchAllNotes();
    }

    const userLogin = async (userDetails) => {
        const login = MyWebpage.URL_END_POINT + MyWebpage.METHODS.LOGIN;
        const response = await fetch(login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
        });
        const data = await response.json();
        displayAlert(data);
        if (data.success) {
            localStorage.setItem("token", data.authToken);
            navigate('/');
        }
    }


    const userRegistration = async (userDetails) => {
        const createUser = MyWebpage.URL_END_POINT + MyWebpage.METHODS.REGISTER;
        const response = await fetch(createUser, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails)
        });
        const data = await response.json();
        displayAlert(data);
    }


    return (
        <NotesContext.Provider value={{ notes, alert, fetchAllNotes, addNote, deleteNote, editNote, userLogin, userRegistration }}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NoteState
