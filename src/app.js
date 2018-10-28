const express = require('express')
const bodyParser = require('body-parser')

const app = express()
    //cargar rutas
const notes_routes = require('./services/notes/route')
const user_routes = require('./services/user/route')

//middlewarw
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
    //routes

app.use('/api/notes', notes_routes)
app.use('/api/user', user_routes)

//exports
module.exports = app