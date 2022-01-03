const Joi = require("joi"),
	xss = require("xss");

const validateQuizId = async (req, res, next) => {
	const quizId = Joi.string()
		.alphanum()
		.length(24)
		.message("Enter a valid quiz ID");

	const { error } = quizId.validate(req.params.quizId, { convert: false });

	sanitizeInput();

	if (error) return res.status(400).send(error.details[0].message);
	next();

	function sanitizeInput() {
		req.params.quizId = xss(req.params.quizId);
	}
};

module.exports = validateQuizId;
