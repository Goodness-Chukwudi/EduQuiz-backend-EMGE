"use strict";

const jwt = require("jsonwebtoken"),
	{ getUser } = require("../data/storage/user");

function Token() {
	this.generate = async (user) => {
		return await jwt.sign(
			{ _id: user._id, userId: user.userId },
			process.env.JWTPrivateKey
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
