import React, { useContext, useEffect, useRef, useState } from 'react';
import NotesContext from '../context/NotesContext';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';




function Notes() {

    const context = useContext(NotesContext);
    const { notes, fetchAllNotes, editNote } = context;

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchAllNotes();
        } else {
            navigate('/login')
        }
        //eslint-disable-next-line
    }, [])

    const editForm = useRef(null);
    const [currentEditNote, setCurrentEditNote] = useState({
        title: '',
        description: '',
        tag: '',
        _id: ''
    });

    const editNoteDetails = (e) => {
        setCurrentEditNote({
            ...currentEditNote,
            [e.target.name]: e.target.value
        })
    }

    const updateNote = (note) => {
        setCurrentEditNote({
            title: note.title,
            description: note.description,
            tag: note.tag,
            _id: note._id
        });
        editForm.current.click();
    }

    const handleUpdateClick = () => {
        editNote(currentEditNote, currentEditNote._id);
    }

    return (
        <>
            <div className="row">
                {notes.map((note) => {
                    return <div className="col-md-3" key={note._id}>
                        <Noteitem note={note} updateNote={updateNote} />
                    </div>
                })}
            </div>

            <button type='button' style={{ display: 'none' }} data-bs-toggle="modal" ref={editForm} data-bs-target="#exampleModal"></button>

            <div className="modal fade " id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Notes</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="col-form-label">Title:</label>
                                    <input type="text" value={currentEditNote.title} onChange={editNoteDetails} className="form-control" id="exampleFormControlInput1" name='title' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="col-form-label">Description:</label>
                                    <textarea className="form-control" value={currentEditNote.description} onChange={editNoteDetails} id="exampleFormControlTextarea1" name='description'></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput2" className="col-form-label">Tag:</label>
                                    <input type="text" value={currentEditNote.tag} onChange={editNoteDetails} className="form-control" id="exampleFormControlInput2" name='tag' />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={currentEditNote.title.length === 0 && currentEditNote.description.length === 0} className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdateClick}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Notes
