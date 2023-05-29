import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    // fetch all notes
    const fetchAllNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchall`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1MTM3YTMzOWRiNzM2YTA1MzEzYTA4In0sImlhdCI6MTY4MzEyOTAyNH0.-kG54ch68e4VuLPkpfymHu2DSq5hkLh8KcVS6n1hx1M'
            }
        })
        const json = await response.json();
        setNotes(json)
    }

    // add a note:
    const addNote = async (title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1MTM3YTMzOWRiNzM2YTA1MzEzYTA4In0sImlhdCI6MTY4MzEyOTAyNH0.-kG54ch68e4VuLPkpfymHu2DSq5hkLh8KcVS6n1hx1M'
            },
            body: JSON.stringify({ title, description, tag })
        })
        const note = await response.json()
        setNotes(notes.concat(note))
    }

    // edit a note
    const editNote = async (id, title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1MTM3YTMzOWRiNzM2YTA1MzEzYTA4In0sImlhdCI6MTY4MzEyOTAyNH0.-kG54ch68e4VuLPkpfymHu2DSq5hkLh8KcVS6n1hx1M'
            },
            body: JSON.stringify({ title, description, tag })
        })
        await response.json();

        let newNote = JSON.parse(JSON.stringify(notes))

        // edit in client
        for (let i = 0; i < newNote.length; i++) {
            const element = newNote[i]
            if (element._id === id) {
                newNote[i].title = title
                newNote[i].description = description
                newNote[i].tag = tag
                break;
            }
        } setNotes(newNote)
    }

    // delete a note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1MTM3YTMzOWRiNzM2YTA1MzEzYTA4In0sImlhdCI6MTY4MzEyOTAyNH0.-kG54ch68e4VuLPkpfymHu2DSq5hkLh8KcVS6n1hx1M'
            },
        })
        await response.json();

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    return (
        <noteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, fetchAllNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState