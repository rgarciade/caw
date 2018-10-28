const saveNote = (note) => {

    return new Promise((resolve, reject) => {
        note.save((err, noteStore) => {
            if (err) {
                console.error(err)
                reject({ msg: 'create Note error' })
            } else if (noteStore) {
                resolve({ message: 'Note create', user: noteStore })
            } else {
                reject({ message: 'createwNote error' })
            }
        })

    })
}
const listNotes = (Note) => {
    return new Promise((resolve, reject) => {
        Note.find({}, (err, notes) => {
            if (err) reject(err)
            resolve(transformNotes(notes));
        });
    })
}
const transformNotes = (notes) => {
    return notes.map((x) => {
        return { id: x._id, title: x.title, text: x.text };
    })
}
module.exports = { saveNote, listNotes };