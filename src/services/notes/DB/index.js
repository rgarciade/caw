const saveNote = (note) => {

    return new Promise((resolve, reject) => {
        note.save((err, noteStore) => {
            if (err) {
                console.error(err)
                reject({ msg: 'create Note error' })
            } else if (noteStore) {
                resolve({ message: 'Note create', user: noteStore })
            } else {
                reject({ message: 'create Note error' })
            }
        })

    })
}
const listNotes = (Note) => {
    return new Promise((resolve, reject) => {
        Note.find({}, (err, notes) => {
            if (err) reject(err)
            resolve(transformNotes(notes));
        })
    })
}
const listNote = (Note, id) => {
    return new Promise((resolve, reject) => {
        Note.findById(id, (err, noteresult) => {
            if (err) reject(err)
            resolve(transformNote(noteresult));
        })
    })
}
const addFavToNote = (Note, NoteId, userId) => {
    return new Promise((resolve, reject) => {
        Note.findByIdAndUpdate({ _id: NoteId }, { $push: { liks: { 'userId': userId } } }, { new: true }, (err, noteresult) => {
            if (err) reject(err)
            resolve(transformNote(noteresult));
        })
    })
}
const findFavInNote = (Note, NoteId, userId) => {
    return new Promise((resolve, reject) => {
        Note.findById(NoteId, (err, note) => {
            if (err) reject(err)
            if (noteExist(note.liks, userId)) {
                resolve(note)
            } else { reject('favorite note to user exist') }

        })
    })
}
const noteExist = (favsArr, userId) => {
    for (let index = 0; index < favsArr.length; index++) {
        if (favsArr[index].userId == userId) return false
    }
    return true

}
const transformNotes = (notes) => {
    return notes.map((note) => {
        return transformNote(note)
    })
}
const transformNote = (note) => {
    return { id: note._id, title: note.title, text: note.text }
}
module.exports = { saveNote, listNotes, listNote, addFavToNote, findFavInNote };