const Cafe = require("../models/cafe");

module.exports = {
  index,
  show,
  new: newCafe,
  create,
  edit,
  update,
};

function index(req, res) {
  res.render("cafes/index", {
    cafes: Cafe.getAll(),
  });
}

async function index(req, res) {
  const cafes = await Cafe.find({});
  res.render("cafes/index", { title: "Cafes", cafes });
}

async function show(req, res) {
  const cafe = await Cafe.findById(req.params.id);
  res.render("cafes/show", { title: "Cafe Review", cafe });
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
      { cafe, features },
      { new: true }
    );

    res.render("cafes/new", { title: "cafe", cafe: updatedCafe });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { error: "Internal server error" });
  }
}
