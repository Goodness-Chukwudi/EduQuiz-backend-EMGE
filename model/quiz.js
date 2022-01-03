"use strict";

const mongoose = require("mongoose"),
	questionSchema = require("./question");

const quizSchema = {
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 1000,
	},
	duration: {
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
};

const Quiz = mongoose.model("Quiz", new mongoose.Schema(quizSchema));

module.exports = Quiz;
