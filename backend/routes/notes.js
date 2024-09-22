const express = require('express');
const router = express.Router();
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');
// const User = require('../models/UserDetails');

//ROUTE: 1 Fetching all notes to your database by using your authentiacation token from fetchuser GET:/auth/fetchallnotes // Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const notes = await Notes.find({ user: userId });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ success: false, errorMsg: 'Internal server error!', message: error });
    }
})

//ROUTE: 2 adding a note to your database by using your authentiacation token from fetchuser POST:/auth/addnotes // Login required
router.post('/addnotes', fetchUser, [
    body('title', 'Please enter a valid title!').isLength({ min: 3 }),
    body('description', 'Please enter atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ errors: result.array() });
    } else {
        const { title, description, tag } = req.body;
        try {
            const note = new Notes({ title, description, tag, user: req.user.id });
            await note.save();
            res.json({ success: true, message: "Note Added Successfully." });
        } catch (error) {
            res.status(500).json({ success: false, errorMsg: 'Internal server error!', message: error });
        }
    }
})


//ROUTE: 3 adding a note to your database by using your authentiacation token from fetchuser PUT:/auth/updatenotes // Login required
router.put('/updatenotes/:id', fetchUser, async (req, res) => {
    try {

        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).json({ success: false, errorMsg: "Notes not found!" });
        } else {
            try {
                if (note.user.toString() === req.user.id) {
                    note = await Notes.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
                    res.json({ success: true, message: "Note updated successully." });
                } else {
                    res.status(400).json({ success: false, errorMsg: 'Your not allowed!' });
                }
            } catch (error) {
                res.status(500).json({ success: false, errorMsg: 'Internal server error!', message: error });
            }
        }
    } catch (error) {
        res.status(500).json({ success: false, errorMsg: 'Internal server error!', message: error });

    }
})


//ROUTE: 4 Deleting a note to your database by using your authentiacation token from fetchuser delete:/auth/deletenotes // Login required

router.delete('/deletenotes/:id', fetchUser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).json({ success: false, errorMsg: "Notes not found!" });
        } else {
            try {
                if (note.user.toString() === req.user.id) {
                    note = await Notes.findByIdAndDelete(req.params.id);
                    res.json({ success: true, message: "Note deleted successfully." });
                } else {
                    res.status(400).json({ success: false, errorMsg: 'Your not allowed!' });
                }
            } catch (error) {
                res.status(500).json({ success: false, errorMsg: 'Internal server error!', message: error });
            }
        }
    }
    catch (error) {
        res.status(500).json({ success: false, errorMsg: 'Internal server error!', message: error });
    }
})

module.exports = router;
