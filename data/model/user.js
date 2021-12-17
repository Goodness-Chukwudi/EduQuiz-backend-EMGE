"use strict";

const Joi = require("joi"),
	mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		trim: true,
	},
	password: { type: String, required: true },
	results: [
		{
			id: String,
			title: String,
			score: {
				type: Number,
				min: 0,
				default: 0,
			},
		},
	],
	quizzes: [
		{
			id: String,
			title: String,
			candidates: {
				type: Number,
				min: 0,
				default: 0,
			},
		},
	],
});

const User = mongoose.model("User", userSchema);

const joiUser = Joi.object({
	userId: Joi.string().email().required(),
	password: Joi.string().required(),
});

function validate(input) {
	return joiUser.validate(input, { convert: false });
}

module.exports = { User, validate };
