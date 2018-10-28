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
        User.findOne({ name: userData.name }, (err, user) => {
            if (err) reject(err, res)
            if (user) {
                bcrypt.compare(userData.password, user.password, (err, check) => {
                    if (check) {
                        resolve(user)
                    } else {
                        reject('error en el loging', req)
                    }
                })
            } else {
                reject('no existe el usuario', res)
            }
        })
    })
}
const transformUser = (user) => {
    return { name: user.name }
}
module.exports = { chekUser, createUser, loginguUser };