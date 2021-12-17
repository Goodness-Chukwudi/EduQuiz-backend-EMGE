"use strict";

const { User } = require("../model/user");

async function updateQuizList(quiz, user) {
	user.quizzes.push({
		id: quiz._id,
		title: quiz.title,
	});
	user.save();
}

async function updateResultList(result, user) {
	user.results.push({
		id: result._id,
		title: result.title,
		score: result.totalScore,
	});
	user.quizzes.forEach((quiz) => {
		if (quiz.id === result.quizId) return quiz.candidates++;
	});

	//increment the number of candidates
	for (let i = 0, len = user.quizzes.length; i < len; i++) {
		if (user.quizzes[i] === result.quizId) user.quizzes[i].candidates++;
		break;
	}

	user.save();
}

async function getUser(id) {
	return await User.findOne({ userId: id });
}

async function saveUser(user) {
	return await user.save();
}

module.exports = { updateQuizList, updateResultList, getUser, saveUser };
