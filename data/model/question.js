"use strict";

module.exports = {
	num: {
		type: Number,
		required: true,
		min: 1,
		max: 100,
	},
	question: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 1000,
	},
	options: {
		type: [String],
		required: true,
	},
	answer: {
		type: String,
		trim: true,
		minlength: 0,
		maxlength: 1000,
	},
	score: {
		type: Number,
		min: 0,
		max: 100,
		required: true,
	},
};
