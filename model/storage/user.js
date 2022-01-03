"use strict";

const User = require("../user");

async function updateQuizList(quiz, userId) {
	let user = await getUser(userId);
	user.quizzes.push({
		id: quiz._id,
		title: quiz.title,
	});
	await user.save();

	user.password = "";
	return user;
}

async function updateResultList(result, userId) {
	let user = await getUser(userId);
	user.results.push({
		id: result._id,
		title: result.title,
		score: result.totalScore,
	});

	let quiz = user.quizzes.find((quiz) => {
		return quiz.id === result.quizId;
	});

	quiz.candidates++;
	user.save();
	return quiz.candidates;

	// user.quizzes.forEach((quiz) => {
	// 	if (quiz.id === result.quizId) {
	// 		quiz.candidates++;
	// 		user.save();
	// 		return quiz.candidates;
	// 	}
	// });
}

async function getUser(id) {
	return await User.findOne({ userId: id });
}

async function saveUser(user) {
	return await user.save();
}

module.exports = { updateQuizList, updateResultList, getUser, saveUser };
