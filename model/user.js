"use strict";

const mongoose = require("mongoose");

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

module.exports = User;
