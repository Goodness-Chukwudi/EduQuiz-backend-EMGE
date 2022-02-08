"use strict";

const { saveResult } = require("../data/result"),
	{ updateResultList } = require("../data/user");

function computeResult(result, answers, userId) {
	result.questions.map((question, i) => {
		if (question.answer !== answers[i].answer) question.score = 0;
		result.questions[i] = question;
		result.totalScore += question.score;
	});

	result.isSubmitted = true;

	//Save the updated result and add the result id to the user info
	saveResult(result).then(() => {
		//add the result id to user details
		updateResultList(result, userId);
	});
}

module.exports = computeResult;
