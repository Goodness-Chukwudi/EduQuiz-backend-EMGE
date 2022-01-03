"use strict";

const Joi = require("joi"),
	xss = require("xss");

const answerUpdate = (req, res, next) => {
	const answerUpdate = Joi.object({
		answer: Joi.string().min(1).max(1000).required(),
		questionNum: Joi.number().min(1).max(100).required(),
		isCompleted: Joi.boolean().required(),
	});

	sanitizeInput();

	const { error } = answerUpdate.validate(req.body, { convert: false });
	if (error) return res.status(400).send(error.details[0].message);
	next();

	function sanitizeInput() {
		req.body.answer = xss(req.body.answer);
	}
};

module.exports = answerUpdate;
