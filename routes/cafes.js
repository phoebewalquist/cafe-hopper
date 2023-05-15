const express = require('express');
const router = express.Router();

const cafesCtrl = require('../controllers/cafes')

//Get router for /cafes/new
router.get('/new', cafesCtrl.new)

module.exports = router