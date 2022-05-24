const jwt = require('jsonwebtoken')
const secret = 'super-secret-key'
const expiresIn = '1h'

exports.sign = (payload) => jwt.sign(payload, secret, { expiresIn })

exports.verify = (token) => {
    try {
        return jwt.verify(token, secret)
    } catch (e) {
        return false
    }
}