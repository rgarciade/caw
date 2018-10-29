const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    name: String,
    password: String,
    favs: [{ noteId: String }]
})
module.exports = mongoose.model('User', UserSchema)