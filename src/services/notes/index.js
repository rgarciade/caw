const Note = require('./models/note')
const DB = require('./DB')

const saveNewNote = (req, res) => {
    try {
        const params = req.body

        if (params.title && params.text) {
            const note = new Note
            note.title = params.title
            note.text = params.text

            DB.saveNote(note)
                .then((msg) => {
                    res.status(200).send(msg)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(404).send({ message: 'createwNote error' })
                })

        } else {
            res.status(404).send({ message: 'bad Params' })
        }

    } catch (error) {
        console.error(error)
        res.status(404).send({ message: 'createwNote error' })
    }
}
const listAllNotes = (req, res) => {
    DB.listNotes(Note)
        .then((msg) => {
            res.status(200).send(msg)
        })
        .catch((err) => {
            console.error(err)
            res.status(404).send({ message: 'list notes error' })
        })
}
const listNote = (req, res) => {
    try {
        const params = req.body

        if (params.id) {
            DB.listNote(Note, params.id)
                .then((msg) => {
                    res.status(200).send(msg)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(404).send({ message: 'list notes error' })
                })
        }
    } catch (error) {
        console.error(error)
        res.status(404).send({ message: 'createwNote error' })
    }

}
module.exports = { saveNewNote, listAllNotes, listNote };