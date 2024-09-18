import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'

function Home() {
    return (
        <>
            <div className="container my-4">
                <h2 className='text-center'>Your NoteBook On Cloud</h2>
                <AddNote />
                <div className="container py-3">
                    <Notes />
                </div>
            </div>
        </>
    )
}

export default Home
