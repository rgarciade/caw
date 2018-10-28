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
const listNote = (Note, id) => {
    return new Promise((resolve, reject) => {
        Note.findById(id, (err, noteresult) => {
            if (err) reject(err)
            resolve(transformNote(noteresult));
        });
    })
}
const transformNotes = (notes) => {
    return notes.map((note) => {
        return transformNote(note)
    })
}
const transformNote = (note) => {
    return { id: note._id, title: note.title, text: note.text }
}
module.exports = { saveNote, listNotes, listNote };