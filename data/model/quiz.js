"use strict";

const Joi = require("joi"),
	mongoose = require("mongoose"),
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

const joiQuiz = Joi.object({
	title: Joi.string().min(1).max(1000).required(),
	duration: Joi.number().min(1).max(500).required(),
	totalScore: Joi.number().min(0).max(100).required(),
	questions: Joi.array()
		.items(
			Joi.object({
				num: Joi.number().min(1).max(100).required(),
				question: Joi.string().min(1).max(1000).required(),
				options: Joi.array()
					.items(Joi.string().min(1).max(1000))
					.required(),
				answer: Joi.string().min(1).max(1000).required(),
				score: Joi.number().min(0).max(100).required(),
			})
		)
		.required(),
});

function validate(input) {
	return joiQuiz.validate(input, { convert: false });
}

module.exports = { Quiz, validate };
