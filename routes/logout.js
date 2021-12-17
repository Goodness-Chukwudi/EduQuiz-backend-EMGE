"use strict";
const express = require("express"),
	router = express(),
	cookie = require("cookie");

router.get("/", async (req, res) => {
	res.setHeader(
		"Set-Cookie",
		cookie.serialize("eduQuiz-sessionCookie-content", "", {
			httpOnly: true,
			sameSite: "none",
			secure: true,
			maxAge: 1,
		})
	);
	res.status(200).send("Bye");
});

module.exports = router;
