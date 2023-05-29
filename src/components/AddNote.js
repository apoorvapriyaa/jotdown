import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

function AddNote(props) {
    const context = useContext(noteContext)
    const { addNote } = context
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const add = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Note Added!", "#e3fdfd")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-3'>
            <h1 className='display-5'>Add a Note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        onChange={onChange}
                        name="title"
                        minLength={3}
                        required
                        value={note.title}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        onChange={onChange}
                        name="description"
                        minLength={5}
                        required
                        value={note.description}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                        Tag
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        onChange={onChange}
                        name="tag"
                        minLength={3}
                        required
                        value={note.tag}
                    />
                </div>
                <button disabled={note.title.length < 3 || note.description.length < 5 || note.tag.length < 3} type="submit" className="btn btn-primary" onClick={add}>
                    ADD
                </button>
            </form>
        </div>
    )
}

export default AddNote