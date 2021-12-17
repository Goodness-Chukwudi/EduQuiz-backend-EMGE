"use strict";

const Joi = require("joi");

const answerUpdate = Joi.object({
	answer: Joi.string().min(1).max(1000).required(),
	questionNum: Joi.number().min(1).max(100).required(),
	isCompleted: Joi.boolean().required(),
});

module.exports = function validate(input) {
	return answerUpdate.validate(input, { convert: false });
};
