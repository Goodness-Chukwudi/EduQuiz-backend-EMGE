"use strict";

const jwt = require("jsonwebtoken"),
	{ getUser } = require("../model/storage/user");

function Token() {
	this.generate = async (user) => {
		return await jwt.sign(
			{ _id: user._id, userId: user.userId },
			process.env.JWTPrivateKey,
			{ expiresIn: "1d" }
		);
	};

	this.verify = async (token) => {
		let user, error;
		try {
			const value = await jwt.verify(token, process.env.JWTPrivateKey);
			user = await getUser(value.userId);
			user.password = "";
		} catch (err) {
			error = err;
		}

		return { user, error };
	};
}

module.exports = new Token();
