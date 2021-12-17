"use strict";

const mongoose = require("mongoose");
const questionSchema = require("./question");

const resultSchema = {
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 1000,
	},
	timeLeft: {
		type: Number,
		min: 0,
		max: 500,
		required: true,
	},
	totalScore: {
		type: Number,
		min: 0,
		max: 100,
		required: true,
	},
	questions: [
		{
			type: questionSchema,
			required: true,
		},
	],
	quizId: {
		type: String,
		required: true,
	},
	isSubmitted: {
		type: Boolean,
		required: true,
	},
};

const Result = mongoose.model("Result", new mongoose.Schema(resultSchema));

module.exports = Result;
