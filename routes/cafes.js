const express = require('express');
const router = express.Router();

const cafesCtrl = require('../controllers/cafes')
const ensureLoggedIn = require('../config/ensureLoggedIn');



// router.get('/', cafesCtrl.index);
router.get('/', cafesCtrl.index)
//Get router for /cafes/new
router.get('/new', ensureLoggedIn, cafesCtrl.new)
router.post('/', ensureLoggedIn, cafesCtrl.create);
router.get('/:id', cafesCtrl.show);
router.get('/:id/edit', cafesCtrl.edit);
//PUT route to update cafes
router.put('/:id', ensureLoggedIn, cafesCtrl.update);


module.exports = router;