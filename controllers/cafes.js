module.exports = {
    new: newCafe
}

function newCafe(req, res) {
    res.render('cafes/new', { errorMsg: ''} );
}