"use strict";

const express = require("express"),
	router = express(),
	quizController = require("../controllers/quiz"),
	resultController = require("../controllers/result"),
	userController = require("../controllers/user"),
	validateQuiz = require("../middlewares/validations/quiz"),
	validateQuizID = require("../middlewares/validations/quizId"),
	validateResultId = require("../middlewares/validations/resultId"),
	validateAnswerUpdate = require("../middlewares/validations/answerUpdate");

//Create a new quiz
router.post("/", validateQuiz, quizController.create);
//start the requested quiz for the user
router.get("/take-quiz/:quizId", validateQuizID, quizController.start);
//Return the quiz with the given id
router.get("/get-quiz/:quizId", validateQuizID, quizController.send);
//Return the result with the given id
router.get("/get-result/:resultId", validateResultId, resultController.send);
//Return the user with the given id
router.get("/me", userController.send);
//update answers for an ongoing quiz when "next" is clicked
router.put("/update-answer", validateAnswerUpdate, quizController.update);

module.exports = router;
