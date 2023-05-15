const express = require('express');
const router = express.Router();

const cafesCtrl = require('../controllers/cafes')


router.get('/', cafesCtrl.index);
//Get router for /cafes/new
router.get('/new', cafesCtrl.new)
router.post('/', cafesCtrl.create);
router.get('/', cafesCtrl.index)

module.exports = router;