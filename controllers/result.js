const { getResult } = require("../service/data/result");
const { saveResult } = require("../service/data/result");

const send = async (req, res) => {
	const resultId = req.params.resultId;
	const result = await getResult(resultId);
	if (result) {
		res.status(200).send(result);
	} else res.status(400).send("Invalid result Id");
};

const create = async (quiz) => {
	for (let i = 0; i < quiz.questions.length; i++) {
		quiz.questions[i].answer = "";
	}

	const result = {
		title: quiz.title,
		timeLeft: quiz.duration,
		totalScore: 0,
		questions: quiz.questions,
		quizId: quiz._id,
		isSubmitted: false,
	};

	return await saveResult(result);
};

module.exports = { send, create };
