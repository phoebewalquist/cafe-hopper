const express = require('express');
const router = express.Router();

const cafesCtrl = require('../controllers/cafes')
const ensureLoggedIn = require('../config/ensureLoggedIn');



// router.get('/', cafesCtrl.index);
//Get router for /cafes/new
router.get('/new', ensureLoggedIn, cafesCtrl.new)
router.post('/', ensureLoggedIn, cafesCtrl.create);
// router.put('/:id', ensureLoggedIn, cafesCtrl.updateCafe);
router.get('/', cafesCtrl.index)
router.get('/:id', cafesCtrl.show);
router.get('/:id/edit', cafesCtrl.edit);
//put

module.exports = router;