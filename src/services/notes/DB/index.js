const saveNote = (note) => {

    return new Promise(function(resolve, reject) {
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
module.exports = { saveNote };