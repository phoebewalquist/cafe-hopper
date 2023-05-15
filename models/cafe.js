const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cafeSchema = new Schema({
    title: { type: String, required: true },
    image: String
    //feautures: String ?
}, {
    timestamps: true
});

module.exports = mongoose.model('Cafe', cafeSchema);