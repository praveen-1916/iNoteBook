import React, { useContext, useState } from 'react'
import NotesContext from '../context/NotesContext';

const AddNote = () => {

    const context = useContext(NotesContext)
    const { addNote } = context;



    const [note, setNote] = useState({
        title: '',
        description: '',
        tag: '',
    });

    const setNoteDetails = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value,
        })
    }

    const handleClick = () => {
        addNote(note);
        setNote({
            title: '',
            description: '',
            tag: '',
        })
    }

    return (
        <div className="container py-3">
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                <input type="text" className="form-control" value={note.title} id="exampleFormControlInput1" name='title' placeholder="Enter your note title" onChange={setNoteDetails} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                <textarea className="form-control" value={note.description} name='description' onChange={setNoteDetails} id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput2" className="form-label">Tag</label>
                <input type="text" className="form-control" value={note.tag} id="exampleFormControlInput2" name='tag' placeholder="Enter your note tag" onChange={setNoteDetails} />
            </div>
            <button disabled={note.title.length === 0 && note.description.length === 0} className='btn btn-primary' onClick={handleClick}>Add Note!</button>
        </div>
    )
}

export default AddNote
