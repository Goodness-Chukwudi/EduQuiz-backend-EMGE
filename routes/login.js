"use strict";

const express = require("express"),
	router = express(),
	userController = require("../controllers/user"),
	validateLogin = require("../middlewares/validations/userCredentials");

router.post("/", validateLogin, userController.login);

module.exports = router;
