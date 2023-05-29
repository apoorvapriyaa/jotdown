import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context

    const cardStyle = {
        backgroundColor: '#f3eeff'
    }

    const { note, updateNote } = props

    return (
        <div className='col-md-3'>
            <div className="card my-3" style={cardStyle}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">
                        {note.description}
                    </p>
                    <i className="fa-solid fa-trash-can mx-2" onClick={() => {
                        deleteNote(note._id)
                        props.showAlert("Note Successfully deleted!", "#e3fdfd")
                    }} />
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {
                        updateNote(note)
                    }} />
                </div>
            </div>
        </div>
    )
}

export default NoteItem