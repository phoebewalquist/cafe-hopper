const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

router.post('/cafes/:id/reviews', upload.single('avatar'), ensureLoggedIn, reviewsCtrl.create);
router.delete('/reviews/:id', ensureLoggedIn, reviewsCtrl.delete);

module.exports = router;