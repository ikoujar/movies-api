const User = require('../models/user')
const authJWT = require('../utils/authJWT')


exports.login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || user.password != password) {
        return res.status(401).json({
            message: 'Invalid credentials!'
        })
    }
    const accessToken = authJWT.sign({ sub: user.id })
    res.status(200).json({
        success: true,
        data: {
            id: user.id,
            name: user.name,
            accessToken
        }
    })
}

exports.register = async (req, res) => {
    const { name, email, password } = req.body
    const user = User({
        name, email, password
    })
    try {
        await user.save()
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong!'})
    }
    res.status(200).json({ success: true })
}

exports.me = async (req, res) => {
    const user = await User.findById(req.userId)
    res.status(200).json({ 
        success: true,
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
        }
     })
}
