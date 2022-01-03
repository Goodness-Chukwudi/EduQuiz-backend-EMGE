const Joi = require("joi"),
	xss = require("xss");

const credentials = async (req, res, next) => {
	const login = Joi.object({
		userId: Joi.string().email().required(),
		password: Joi.string().alphanum().min(8).required(),
	});

	const { error } = login.validate(req.body, { convert: false });

	sanitizeInput();

	if (error) return res.status(400).send(error.details[0].message);
	next();

	function sanitizeInput() {
		req.body.userId = xss(req.body.userId);
		req.body.password = xss(req.body.password);
	}
};

module.exports = credentials;
