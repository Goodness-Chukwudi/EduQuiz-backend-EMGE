const Joi = require("joi"),
	xss = require("xss");

const validateQuiz = async (req, res, next) => {
	const quiz = Joi.object({
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

	sanitizeInput();

	const { error } = quiz.validate(req.body, { convert: false });
	if (error) return res.status(400).send(error.details[0].message);
	next();

	function sanitizeInput() {
		req.body.title = xss(req.body.title);
		req.body.questions = req.body.questions.map((quest) => {
			quest.question = xss(quest.question);
			quest.options = quest.options.map((option) => {
				return xss(option);
			});
			quest.answer = xss(quest.answer);

			return quest;
		});
	}
};

module.exports = validateQuiz;
