const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: { type: String, required: true },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
     }
    }, {
        timestamps: true
    });

const cafeSchema = new Schema({
    title: { type: String, required: true },
    // image: String
    //feautures: String ?
    reviews: [reviewSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Cafe', cafeSchema);