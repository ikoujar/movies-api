const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: false
    },
    rate: {
        type: Number,
        default: 0
    },
    reviews: {
        type: [
            { 
                user: {
                    type: mongoose.Schema.Types.ObjectId, ref: 'User'
                },
                comment: String,
                rate: Number  
            }   
        ],
        default: []
    }
});


ModelSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});
  
const Model = mongoose.model('Movie', ModelSchema);

module.exports = Model;

