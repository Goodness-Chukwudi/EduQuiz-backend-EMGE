"use strict";

const express = require("express"),
	router = express(),
	userController = require("../controllers/user");

router.get("/", userController.logout);

module.exports = router;
