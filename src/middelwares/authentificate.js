const jwt = require('jwt-simple')
const moment = require('moment')
const Constants = require('../../constants');

const ensureAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status('403').send({ message: 'The request does not have the authentication header' })
    }
    const token = req.headers.authorization.replace(/['"]+/g, '')

    try {
        let payload = jwt.decode(token, Constants.jwt.key)
        if (payload.ext <= moment().unix()) {
            return res.status(401).send({
                message: 'the token expired'
            })
        }
    } catch (ex) {
        return res.status(401).send({
            message: 'invalid token'
        })
    }
    next()
}
module.exports = { ensureAuth }