const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const featureSchema = new Schema({
    feature: {
    type: String,
    required: true,
    unique: true
  }});

module.exports = mongoose.model('Feature', featureSchema);