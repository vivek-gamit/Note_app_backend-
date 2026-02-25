// server ko create karna 
const express = require('express')

const app = express()
app.use(express.json())
const notes = []

//title, decription
//post/notes

app.post('/notes', (req,res) =>{
    const NewNote = req.body;

    notes.push(NewNote);

    res.status(201).json({
        message: "note created successfully",
        note:NewNote
    })
    
})

//get/notes
app.get('/notes', (req,res) => {

    res.status(200).json({
        message:"note fetch successfuly",
        notes:notes
    })
})

app.delete('/notes/:index', (req,res) =>{
    const index = req.params.index

    delete notes[index]

    res.status(200).json({
        message:'note deleted successfully'
    })
})

app.patch('/notes/:index', (req, res) => {
    const index = req.params.index
    const description = req.body.description
    const title = req.body.title

    notes[index].description = description
    notes[index].title = title

    res.status(200).json({
        message:"note updated successfully..."
    })
})

module.exports = app