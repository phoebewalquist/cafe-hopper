const Cafe = require('../models/cafe');

module.exports = {
  create,
  delete: deleteReview
};

async function deleteReview(req, res, next) {

   Cafe.findOne({ 
        'reviews._id': req.params.id,
         'reviews.user': req.user._id 
        }).then(function(cafe){
    if (!cafe) return res.redirect('/cafes');
    cafe.reviews.remove(req.params.id);
    cafe.save().then(function() {
        res.redirect(`/cafes/${cafe._id}`);
    }).catch(function(err){
        return next(err);
    });
 });
}


async function create(req, res) {
  const cafe = await Cafe.findById(req.params.id);
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  movie.reviews.push(req.body);
  try {
   await cafe.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/cafes/${cafe._id}`);
}