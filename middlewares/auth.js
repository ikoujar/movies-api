const authJWT = require('../utils/authJWT')

exports.verify = (req, res, next) => {
    const token = req.headers['authorization']?.replace('Bearer ', '')
    const payload = authJWT.verify(token)
    if (payload) {
        req.userId = payload.sub
        return next()
    }
    res.status(401).json({ message: 'Unauthorized!'})
}