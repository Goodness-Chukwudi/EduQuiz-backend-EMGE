"use strict";

const express = require("express"),
	router = express(),
	userController = require("../controllers/user"),
	validateRegistration = require("../middlewares/validations/userCredentials"),
	checkExistingUser = require("../middlewares/checkExistingUser");

//Post a new user for registration
router.post(
	"/",
	validateRegistration,
	checkExistingUser,
	userController.register
);

module.exports = router;
