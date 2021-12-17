"use strict";

const express = require("express"),
	router = express(),
	{ validate: validateQuiz } = require("../data/model/quiz"),
	validateAnswer = require("../data/model/answer"),
	{ saveQuiz, getQuiz } = require("../data/storage/quiz"),
	{ updateQuizList, getUser } = require("../data/storage/user"),
	{ getResult } = require("../data/storage/result"),
	createResult = require("../utils/createResult"),
	runningQuiz = require("../services/runningQuiz");

//Create a new quiz
router.post("/", async (req, res) => {
	const { error, value } = validateQuiz(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
	} else {
		const quiz = await saveQuiz(value);
		// Update the users quiz list
		await updateQuizList(quiz, req.user);
		// update req.user
		let user = req.user;
		res.status(200).send(user);
	}
});

//start the requested quiz for the user
router.get("/take-quiz/:quizId", async (req, res) => {
	const quizId = req.params.quizId;
	const quiz = await getQuiz(quizId);
	if (quiz) {
		//create a result object with no answer from the quiz and send it to the user
		let result = await createResult(quiz);
		res.status(200).send(result);
		runningQuiz.addQuiz(result, req.user.userId);
	} else res.status(400).send("Invalid quiz Id");
});

//Get a quiz with the given id
router.get("/get-quiz/:quizId", async (req, res) => {
	const quizId = req.params.quizId;
	const quiz = await getQuiz(quizId);
	if (quiz) {
		res.status(200).send(quiz);
	} else res.status(400).send("Invalid quiz Id");
});

//Get a result with the given id
router.get("/get-result/:resultId", async (req, res) => {
	const resultId = req.params.resultId;
	const result = await getResult(resultId);
	if (result) {
		res.status(200).send(result);
	} else res.status(400).send("Invalid result Id");
});

//Get a user with the given id
router.get("/user", async (req, res) => {
	const userId = req.params.userId;
	const user = req.user;
	if (user) {
		res.status(200).send(user);
	} else res.status(400).send("Error! User not found!");
});

//update answers for an ongoing quiz when "next" is clicked
router.put("/update-answer", async (req, res) => {
	const { error, value } = validateAnswer(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
	} else {
		runningQuiz.updateQuiz(value, req.user.userId);
		res.status(200).send("Success");
	}
});

module.exports = router;
