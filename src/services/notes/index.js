var Note = require('./models/note')
const DB = require('./DB')

const saveNewNote = (req, res) => {
    try {
        var params = req.body
        var note = new Note

        if (params.title && params.text) {
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
module.exports = { saveNewNote };