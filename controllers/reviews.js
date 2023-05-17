const Cafe = require("../models/cafe");
const fs = require("fs");
const path = require("path");

module.exports = {
  create,
  delete: deleteReview,
};


function isImg(mimetype) {
  return mimetype === "image/jpeg" || mimetype === "image/png";
}

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
  if (!isImg(req.file.mimetype)) {
    console.log("You must upload a jpeg or png");
    fs.unlinkSync(__basedir + `/public/uploads/${req.file.filename}`);
    return res.redirect("/posts/new");
  }
  // Multer
  const avatar = {
    image: {
      data: path.join("uploads/" + req.file.filename),
      contentType: req.file.mimetype,
    },
  };
  req.body.image = avatar;

  const cafe = await Cafe.findById(req.params.id);
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  cafe.reviews.push(req.body);
  try {
    await cafe.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/cafes/${cafe._id}`);
}

