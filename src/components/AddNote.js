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

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note);
        setNote({
            title: '',
            description: '',
            tag: '',
        })
    }

    return (
        <div className="container py-3">
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                    <input type="text" className="form-control" minLength={3} value={note.title} id="exampleFormControlInput1" name='title' placeholder="Enter your note title" onChange={setNoteDetails} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea className="form-control" value={note.description} minLength={5} name='description' onChange={setNoteDetails} id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput2" className="form-label">Tag</label>
                    <input type="text" className="form-control" value={note.tag} id="exampleFormControlInput2" name='tag' placeholder="Enter your note tag" onChange={setNoteDetails} />
                </div>
                <button disabled={note.title.length === 0 && note.description.length === 0} type='submit' className='btn btn-primary' >Add Note!</button>
            </form>
        </div>
    )
}

export default AddNote
