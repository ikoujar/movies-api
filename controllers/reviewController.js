const Movie = require('../models/movie')
const User = require('../models/user')

exports.review = async (req, res) => {
    const { id } = req.params
    const { comment, rate } = req.body
}
