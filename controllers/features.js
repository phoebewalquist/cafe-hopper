
const Cafe = require('../models/cafe');

module.exports = {
  new: newFeature,
  create
};

async function create(req, res) {
    console.log('-----', req.body.feature)
  const cafe = await Cafe.findById(req.params.id);
  console.log('cafe')
  cafe.features.push(req.body.feature);
  await cafe.save();
  res.redirect(`/cafes/${cafe._id}`);
}

async function newFeature(req, res) {
  const cafe = await Cafe.findById(req.params.id);
  res.render('features/new', { title: 'Add Feature', cafe });
}

