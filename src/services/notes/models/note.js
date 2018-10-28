const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = Schema({
    title: String,
    text: String,
    liks: String
})
module.exports = mongoose.model('Note', NoteSchema)