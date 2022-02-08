"use strict";

const { getUser } = require("../service/data/user");

const checkExistingUser = (req, res, next) => {
	let existingUser = await getUser(req.body.userId);
	if (existingUser) return res.status(400).send("This user already exist!");

	next();
};

module.exports = checkExistingUser;
