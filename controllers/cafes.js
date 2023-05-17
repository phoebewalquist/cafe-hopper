const Cafe = require('../models/cafe');


module.exports = {
    index,
    show,
    new: newCafe,
    create

}

function index(req, res) {
    res.render('cafes/index', {
        cafes: Cafe.getAll()
    })
}


async function index(req, res) {
    const cafes = await Cafe.find({});
    res.render('cafes/index', { title: 'Cafes',cafes });
  }

  async function show(req, res) {
   const cafe = await Cafe.findById(req.params.id);
   res.render('cafes/show', { title: 'Cafe Review', cafe});
  }


function newCafe(req, res) {
    res.render('cafes/new', { title: 'Add Cafe',errorMsg: ''});
}

async function create(req, res) {
    try {
      await Cafe.create(req.body);
      res.redirect('/cafes');
    } catch (err) {
        res.render('cafes/new', { errMsg: err.message });
    }
  }



