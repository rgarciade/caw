const chekUser = (User, user) => {
    return new Promise((resolve, reject) => {
        User.find({ name: user.name.toLowerCase() }, (err, user) => {

            if (err) reject(err)
            if (user && user.length > 0) {
                reject({ message: 'El usuario ya existe' })
            }
            resolve()
        })
    })
}
const createUser = (hash, user) => {
    return new Promise((resolve, reject) => {

        user.password = hash
        user.save((err, userStore) => {
            if (err) {
                reject(err)
            } else if (userStore) {
                resolve({ message: 'usuario creado', user: transformUser(userStore) })
            } else {
                reject({ message: 'no se ha registrado el usuario' })
            }
        })
    })

}
const loginguUser = (User, bcrypt, userData) => {
    return new Promise((resolve, reject) => {
        console.log(userData)
        User.findOne({ name: userData.name }, (err, user) => {
            if (err) reject(err, res)
            if (user) {
                bcrypt.compare(userData.password, user.password, (err, check) => {
                    if (check) {
                        resolve(user)
                    } else {
                        reject('error en el loging')
                    }
                })
            } else {
                reject('no existe el usuario')
            }
        })
    })
}
const getUserFavs = (User, userId) => {
    return new Promise((resolve, reject) => {
        User.findById(userId, (err, user) => {
            if (err) reject(err, res)
            if (user) {
                resolve(user.favs.reverse())
            } else {
                reject('no existe el usuario')
            }
        })
    })
}
const addFavToNoteToUser = (Note, NoteId, userId) => {
    return new Promise((resolve, reject) => {
        Note.findByIdAndUpdate({ _id: userId }, { $push: { favs: { 'noteId': NoteId } } }, { new: true }, (err, noteresult) => {
            if (err) reject(err)
            resolve({ msg: 'fav add' });
        });
    })
}
const transformUser = (user) => {
    return { name: user.name }
}
module.exports = { chekUser, createUser, loginguUser, addFavToNoteToUser, getUserFavs };