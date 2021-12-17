"use strict";

const express = require("express"),
	router = express(),
	{ getUser } = require("../data/storage/user"),
	Token = require("../utils/token"),
	cookie = require("cookie"),
	bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	const user = await getUser(req.body.userId);
	if (!user) return res.status(401).send("Invalid email or password!");
	// Compare user details
	const valid = await bcrypt.compare(req.body.password, user.password);
	if (!valid) return res.status(401).send("Invalid email or password!");

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
});

module.exports = router;
