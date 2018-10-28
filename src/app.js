const express = require('express')
const bodyParser = require('body-parser')

const app = express()
    //cargar rutas
const notes_routes = require('./services/notes/route')

//middlewarw
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
    //routes

app.use('/api/notes', notes_routes)

//exports
module.exports = app