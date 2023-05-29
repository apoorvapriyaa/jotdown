const express = require('express')
const router = express.Router()
let fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')

// ROUTE 1: Get all the notes using: GET "/api/notes/fetchall". Login required
router.get('/fetchall', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

// ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Enter a valid description').isLength({ min: 8 }),
    body('tag', 'Enter a valid tag').isLength({ min: 3 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        // if there are errors, return bad request and quit
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

// ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body

    try {
        // create a newNote object
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // find the note to be updated and update it
        let note = await Notes.findById(req.params.id)
        if (!note) { res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

// ROUTE 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id)
        if (!note) { res.status(404).send("Not Found") }

        // allow deletion only to the owner of the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted" })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

module.exports = router