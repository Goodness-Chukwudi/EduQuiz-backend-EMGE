"use strict";

const Quiz = require("../quiz");

async function saveQuiz(input) {
	return await new Quiz(input).save();
}

async function getQuiz(id) {
	return await Quiz.findById(id);
}

module.exports = { saveQuiz, getQuiz };
