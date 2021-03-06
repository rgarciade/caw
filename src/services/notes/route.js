const express = require('express')
const NotesService = require('./')

const api = express.Router();

api.post('/addNote', NotesService.saveNewNote)
api.get('/ListAll', NotesService.listAllNotes)
api.post('/getNote', NotesService.listNote)
api.post('/addFav', NotesService.addFav)


module.exports = api;