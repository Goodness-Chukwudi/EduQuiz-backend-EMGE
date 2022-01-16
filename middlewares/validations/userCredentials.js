const Joi = require("joi"),
	xss = require("xss");

const credentials = async (req, res, next) => {
	let credentials;
	// check if the request is for signup (contains confirmPassword) or for login
	if (req.body.confirmPassword) {
		credentials = Joi.object({
			userId: Joi.string().email().required(),
			password: Joi.string().alphanum().min(8).required(),
			confirmPassword: Joi.ref("password"),
		});
	} else {
		credentials = Joi.object({
			userId: Joi.string().required(),
			password: Joi.string().required(),
		});
	}

	const { error } = credentials.validate(req.body, { convert: false });
	if (error) return res.status(400).send(error.details[0].message);

	sanitizeInput();
	next();

	function sanitizeInput() {
		req.body.userId = xss(req.body.userId);
		req.body.password = xss(req.body.password);
	}
};

module.exports = credentials;
