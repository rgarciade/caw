const User = require('./models/user')
const DB = require('./DB')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jwt-simple')
const moment = require('moment')
const Constants = require('../../../constants');

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
            res.status(200).send({ userName: user.name, token: createToken(user) })
        }).catch((err) => {
            console.error(err)
            res.status(404).send({ err: err })
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
const createToken = (user) => {
    var payload = {
        sub: user._id,
        name: user.name,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }
    return jwt.encode(payload, Constants.jwt.key)
}

module.exports = { saveUser, loginguUser, addFavToNoteToUser }