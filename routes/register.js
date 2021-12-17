"use strict";

const express = require("express"),
	router = express(),
	{ saveUser, getUser } = require("../data/storage/user"),
	{ User, validate } = require("../data/model/user"),
	hash = require("../utils/hash"),
	Token = require("../utils/token"),
	cookie = require("cookie");

//Post a new user for registration
router.post("/", async (req, res) => {
	const { error, value } = validate(req.body);
	let existingUser = await getUser(value.userId);
	if (existingUser) return res.status(400).send("This user already exist!");

	if (error) {
		res.status(400).send(error.details[0].message);
	} else {
		// Create and save user
		value.password = await hash(value.password);
		let user = new User(value);
		user = await saveUser(user);

		//generate token and send as cookie
		const token = await Token.generate(user);
		res.setHeader(
			"Set-Cookie",
			cookie.serialize("eduQuiz-sessionCookie-content", token, {
				httpOnly: true,
				sameSite: "none",
				secure: true,
				maxAge: 60 * 60 * 1000,
			})
		);

		//send back user without password
		user.password = "";
		res.status(200).send(user);
	}
});

module.exports = router;
