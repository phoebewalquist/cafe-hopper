const Cafe = require("../models/cafe");
const Feature = require("../models/feature")
module.exports = {
  index,
  show,
  new: newCafe,
  create,
  edit,
  update
};


async function index(req, res) {
  const cafes = await Cafe.find({});
  res.render("cafes/index", { title: "Cafes", cafes });
}

async function show(req, res) {
  const cafe = await Cafe.findById(req.params.id);
  res.render("cafes/show", { title: "Cafe Review", cafe});
}

async function newCafe(req, res) {
  try {
    const cafe = {
      cafe: "",
      features: [],
    };
  res.render("cafes/new", { title: "", errorMsg: "", cafe });
  } catch (err) {
    console.error(err);
  }
}

async function create(req, res) {
  try {
    await Cafe.create(req.body);
    res.redirect("/cafes");
  } catch (err) {
    res.render("cafes/new", { errMsg: err.message });
  }
}


async function edit(req, res) {
  const cafe = await Cafe.findById(req.params.id);
  res.render('cafes/edit', { title: 'Edit Features', cafe });
}

async function update(req, res) {
  const cafe = await Cafe.findById(req.params.id);
  try {
      Object.assign(cafe, req.body);
      await cafe.save();
  } catch (err) {
      console.log(err);
      res.render('cafes/show', { errorMsg: 'failed to edit cafe ):'});
  }
  res.redirect(`/cafes/${cafe._id}`);
}

