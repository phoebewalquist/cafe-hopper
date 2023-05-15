const Cafe = require('../models/cafe');


module.exports = {
    index,
    new: newCafe
}

async function index(req, res) {
    const cafes = await Cafe.find({});
    res.render('cafes/index', { cafes });
  }

function newCafe(req, res) {
    res.render('cafes/new', { errorMsg: ''});
}