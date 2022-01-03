"use strict";

const express = require("express"),
	router = express(),
	userController = require("../controllers/user"),
	validateRegistration = require("../middlewares/validations/userCredentials");

//Post a new user for registration
router.post("/", validateRegistration, userController.register);

module.exports = router;
