"use strict";

const Token = require("../utils/token");

const authentication = async (req, res, next) => {
	const token = req.cookies["eduQuiz-sessionCookie-content"];
	console.log(token);
	if (!token)
		return res.status(401).send("Access denied! Please login to continue");

	const { user, error } = await Token.verify(token);
	if (error) return res.status(400).send("Access denied! Bad token");

	if (user) {
		req.user = user;
		next();
	} else res.status(400).send("Access denied! this user does not exist!");
};

module.exports = authentication;
