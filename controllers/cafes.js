const Cafe = require('../models/cafe');


module.exports = {
    index,
    new: newCafe,
    create,

}

function index(req, res) {
    res.render('cafes/index', {
        cafes: Cafe.getAll()
    })
}


async function index(req, res) {
    const cafes = await Cafe.find({});
    res.render('cafes/index', { title: 'All Cafes',cafes });
  }

function newCafe(req, res) {
    res.render('cafes/new', { title: 'Add Cafe',errorMsg: ''});
}

async function create(req, res) {
    try {
      await Cafe.create(req.body);
      res.redirect('/cafes');
    } catch (err) {
      res.redirect('/cafes/new?errorMsg=' + err.message);
    }
  }

