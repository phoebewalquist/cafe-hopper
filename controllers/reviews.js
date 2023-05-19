const Cafe = require("../models/cafe");
const sharp = require('sharp');

module.exports = {
  create,
  delete: deleteReview,
  processImage,
  edit,
  update
};

async function deleteReview(req, res, next) {
  Cafe.findOne({
    "reviews._id": req.params.id,
    "reviews.user": req.user._id,
  }).then(function (cafe) {
    if (!cafe) return res.redirect("/cafes");
    cafe.reviews.remove(req.params.id);
    cafe
      .save()
      .then(function () {
        res.redirect(`/cafes/${cafe._id}`);
      })
      .catch(function (err) {
        return next(err);
      });
  });
}

async function create(req, res) {
  const cafe = await Cafe.findById(req.params.id);
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  console.log(req.body)
  cafe.reviews.push(req.body);
  
  try {
    await cafe.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/cafes/${cafe._id}`);
}


async function processImage(req, res) {
  const imageAddress = req.body.image;

  // Process the image
  try {
    const processedImage = await sharp(imageAddress)
      .resize(500) 
      .toBuffer();
    res.redirect('/cafes/');
  } catch (error) {
    console.error('Image processing error:', error);
    res.status(500).send('Error processing image');
  }
}

async function edit(req, res) {
  const cafeId = req.params.id;
  try {
    const cafe = await Cafe.findById(cafeId);
    res.render("cafes/edit", { title: "Edit Features", cafe });
  } catch (err) {
    console.error(err);
    // res.redirect('/cafes');
  }
}

async function update(req, res) {
  try {
    const { cafe, features } = req.body;

    const updatedCafe = await Cafe.findByIdAndUpdate(
      req.params.id,
      { name: cafe, features },
      { new: true }
    );

    res.redirect(`/cafes/${updatedCafe._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { error: "Internal server error" });
  }
}