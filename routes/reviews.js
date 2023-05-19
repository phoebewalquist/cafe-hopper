const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/cafes/:id/reviews', ensureLoggedIn, reviewsCtrl.create);
router.delete('/reviews/:id', ensureLoggedIn, reviewsCtrl.delete);
router.post('/:id/image', ensureLoggedIn, reviewsCtrl.processImage); 
// router.get('/:id/edit', ensureLoggedIn, reviewsCtrl.edit);
// router.put('/:id', ensureLoggedIn, reviewsCtrl.update);
module.exports = router;

