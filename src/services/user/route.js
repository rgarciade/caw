const express = require('express')
const UserService = require('./')

const api = express.Router();

api.post('/register', UserService.saveUser)
api.post('/loging', UserService.loginguUser)
api.post('/ListAllfavoritesNotes', UserService.ListAllfavoritesNotes)

module.exports = api;