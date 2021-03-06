"ue strict";

const { saveResult } = require("../data/result");

const createResult = async (quiz) => {
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

module.exports = createResult;
