
const Cafe = require('../models/cafe');

module.exports = {
  new: newFeature,
  create
};

async function create(req, res) {
    console.log('-----', req.body)
  const cafe = await Cafe.findById(req.params.id);
  console.log('cafe')
  req.body.features.forEach(feature => {
    cafe.features.push(feature);
  })
  await cafe.save();
  res.redirect(`/cafes/${cafe._id}`);
}

async function newFeature(req, res) {
  const cafe = await Cafe.findById(req.params.id);
  res.render('features/new', { title: 'Add Feature', cafe });
}

