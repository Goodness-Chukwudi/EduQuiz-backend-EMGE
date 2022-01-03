const Joi = require("joi"),
	xss = require("xss");

const validateResultId = async (req, res, next) => {
	const resultId = Joi.string()
		.alphanum()
		.length(24)
		.message("Enter a valid result ID");

	const { error } = resultId.validate(req.params.resultId, {
		convert: false,
	});

	sanitizeInput();

	if (error) return res.status(400).send(error.details[0].message);
	next();

	function sanitizeInput() {
		req.params.resultId = xss(req.params.resultId);
	}
};

module.exports = validateResultId;
