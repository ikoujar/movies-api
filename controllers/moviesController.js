const Movie = require('../models/movie')

exports.create = async (req, res) => {
    const { name, category, description } = req.body
    const movie = new Movie({
        name,
        category, 
        description   
    })
    await movie.save()
    res.status(201).json({
        data: movie
    })
}

exports.update = async (req, res) => {
    const { id } = req.params
    const { name, category, description } = req.body
    await Movie.updateOne(
        { _id: id },
        {
            $set: {
                name, category, description
            }
        }
    )
}

exports.delete = async (req, res) => {
    const { id } = req.params
    await Movie.deleteOne({ _id: id });
    res.status(200).send()
}

exports.find = async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findById(id).select('-reviews')
    if (!movie) return res.status(404).send()
    res.status(201).json({
        succes: true,
        data: movie
    })
}

exports.list = async (req, res) => {
    const { page } = req.query
    const movies = await Movie.find().select('-reviews')
    res.status(200).json({
        succes: true,
        data: movies
    })
}

exports.reviews = async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findById(id)
        .select('-reviews._id')
        .populate('reviews.user', 'name')
    res.status(201).json({
        succes: true,
        data: movie.reviews
    })
}

exports.addReview = async (req, res) => {
    const { id } = req.params
    const { comment, rate } = req.body

    const movie = await Movie.findById(id)
    if (!movie) return res.status(404).json()

    const isRated = movie.reviews.findIndex(e => e.user == req.userId)

    if (isRated > -1) return res.status(403).json({
        message: "Review is alraedy added."
    })
    const totalVotes = movie.reviews.reduce((sum, review) => sum + review.rate, 0);
    await Movie.updateOne(
        { _id: id },
        {
            $push: { reviews: { user: req.userId, comment, rate } },
            $set: { rate: (totalVotes + rate) / (movie.reviews.length + 1) } 
        }
    )
    res.status(201).json({
        succes: true
    })
}
