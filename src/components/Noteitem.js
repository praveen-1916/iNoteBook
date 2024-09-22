import React, { useContext } from 'react'
import NotesContext from '../context/NotesContext';



function Noteitem(props) {
    const { note, updateNote } = props;

    const context = useContext(NotesContext);
    const { deleteNote } = context;

    return (

        <div className="card my-3">
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-solid fa-trash ms-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top" onClick={() => { deleteNote(note._id) }}></i>
                    <i className="fa-solid fa-pen-to-square ms-3 tt" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top" onClick={() => { updateNote(note) }} ></i>
                </div>
                <p className="card-text">{note.description}.</p>
                {/* <p className="card-text">{description}.</p> */}
            </div>
        </div>

    )
}

export default Noteitem
