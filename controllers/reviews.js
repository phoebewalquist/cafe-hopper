const Cafe = require('../models/cafe');

module.exports = {
    create
};

async function create(req, res) {
    const cafe = await Cafe.findById(req.params.id);
    cafe.reviews.push(req.body)
    try {
        await cafe.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/cafes/${cafe._id}`);
}