"use strict";

const { saveQuiz, getQuiz } = require("../service/data/quiz"),
	{ updateQuizList } = require("../service/data/user"),
	resultController = require("./result"),
	QuizRunner = require("../service/quiz/quizRunner");

const create = async (req, res) => {
	const quiz = await saveQuiz(req.body);
	// Update the users quiz list
	req.user = await updateQuizList(quiz, req.user.userId);
	res.status(200).send("Quiz created!");
};

const send = async (req, res) => {
	const quizId = req.params.quizId;
	const quiz = await getQuiz(quizId);
	if (quiz) {
		res.status(200).send(quiz);
	} else res.status(400).send("Invalid quiz Id");
};

const start = async (req, res) => {
	const quizId = req.params.quizId;
	const quiz = await getQuiz(quizId);
	if (quiz) {
		//create a result object with no answer from the quiz and send it to the user
		let result = await resultController.create(quiz);
		res.status(200).send(result);
		QuizRunner.addQuiz(result, req.user.userId);
	} else res.status(400).send("Invalid quiz Id");
};

const update = (req, res) => {
	QuizRunner.updateQuiz(req.body, req.user.userId);
	res.status(200).send("Success");
};

module.exports = { create, send, start, update };
