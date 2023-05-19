const express = require("express");
const router = express.Router();
const featuresCtrl = require("../controllers/features");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/cafe/:id/features/new", ensureLoggedIn, featuresCtrl.new);
router.post("/cafe/:id/features/new", ensureLoggedIn, featuresCtrl.create);

module.exports = router;
