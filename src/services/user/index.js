const User = require('./models/user')
const Note = require('../notes/models/note')
const DB = require('./DB')
const DB_note = require('../notes/DB')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jwt-simple')
const moment = require('moment')
const Constants = require('../../../constants');
const auth = require('../../middelwares/authentificate')

function saveUser(req, res) {
    const params = req.body

    if (params.name && params.password) {

        const user = new User
        user.name = params.name
        user.password = params.password
        DB.chekUser(User, user)
            .then(() => {
                bcrypt.hash(user.password, null, null, (err, hash) => {
                    DB.createUser(hash, user).then(usrData => {
                        res.status(200).send(usrData)
                    })
                })
            })
            .catch((err) => {
                console.error(err)
                res.status(404).send({ message: 'create User error', err: err })
            })

    } else {
        res.status(404).send('Send the necessary fields', res)
    }
}


function loginguUser(req, res) {
    const params = req.body
    const userData = {
        name: params.name,
        password: params.password
    }
    DB.loginguUser(User, bcrypt, userData)
        .then((user) => {
            res.status(200).send({ userName: user.name, userId: user._id, token: createToken(user) })
        }).catch((err) => {
            console.error(err)
            res.status(401).send({ err: err })
        })
}

function addFavToNoteToUser(req, res) {
    try {
        const params = req.body

        if (params.userId && params.NoteId) {
            DB.addFavToNote(Note, params.NoteId, params.userId)
                .then((msg) => {
                    res.status(200).send(msg)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(404).send({ message: 'add favorite error' })
                })
        }
    } catch (error) {
        console.error(error)
        res.status(404).send({ message: 'need userId' })
    }
}

function ListAllfavoritesNotes(req, res) {
    try {
        const params = req.body
        const userId = auth.getUserId(req.headers.authorization)
        if (userId) {
            DB.getUserFavs(User, userId)
                .then((favs) => {
                    let proms = []
                    for (let index = 0; index < favs.length; index++) {
                        proms.push(DB_note.listNote(Note, favs[index].noteId))
                    }

                    Promise.all(proms).then(values => {
                        res.status(200).send(values)
                    }).catch(err => {
                        console.error(err)
                        res.status(404).send({ message: 'list favorite error' })
                    });

                })
                .catch((err) => {
                    console.error(err)
                    res.status(404).send({ message: 'list favorite error' })
                })
        }
    } catch (error) {
        console.error(error)
        res.status(404).send({ message: 'need userId' })
    }
}
const createToken = (user) => {
    var payload = {
        sub: user._id,
        name: user.name,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }
    return jwt.encode(payload, Constants.jwt.key)
}

module.exports = { saveUser, loginguUser, addFavToNoteToUser, ListAllfavoritesNotes }