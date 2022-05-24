const mongoose = require('mongoose');


const ModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    watchList: [
        { 
            movie: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Movie'
            },
            watched: Boolean  
        }   
    ]
});

const Model = mongoose.model('User', ModelSchema);

module.exports = Model;

