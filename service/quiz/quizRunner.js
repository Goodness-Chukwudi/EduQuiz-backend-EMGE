"use strict";

const { getAnswers } = require("../data/result"),
	computeResult = require("./resultProcessor");

let map = new Map(),
	completedQuiz = new Map(),
	intervalId;

function QuizRunner() {
	this.activeQuizzes = map;

	this.addQuiz = (quiz, userId) => {
		this.activeQuizzes.set(userId, quiz);
		if (this.activeQuizzes.size === 1) manageTime(this.activeQuizzes, true);
	};

	this.updateQuiz = (answerUpdate, userId) => {
		const quiz = this.activeQuizzes.get(userId);
		if (quiz) {
			if (answerUpdate.isCompleted) {
				completedQuiz.set(userId, quiz);
				endQuiz();
			} else {
				quiz.questions[answerUpdate.questionNum - 1].answer =
					answerUpdate.answer;
			}
		}
	};
}

//Updates remaining time for all running quizzes
function manageTime(quizList, isFirst = false) {
	if (isFirst) {
		intervalId = setInterval(() => {
			manageQuiz(quizList);
		}, 10000);
	} else if (quizList.size === 0) {
		clearInterval(intervalId);
	}
}

function manageQuiz(quizList) {
	quizList.forEach((quiz, userId) => {
		//if quiz is timed out, add to list of completed quizzes
		if (quiz.timeLeft <= 0) {
			completedQuiz.set(userId, quiz);
		} else {
			quiz.timeLeft--;
			quizList.set(userId, quiz);
		}
	});

	QuizRunner.activeQuizzes = quizList;
	endQuiz();
}

function endQuiz() {
	let answers = [];
	if (completedQuiz.size > 0) {
		completedQuiz.forEach((quiz, userId) => {
			console.log(QuizRunner.activeQuizzes);
			if (QuizRunner.activeQuizzes)
				QuizRunner.activeQuizzes.delete(userId);
			// compute and save result
			getAnswers(quiz.quizId).then((val) => {
				answers = val;
				computeResult(quiz, answers, userId);
			});
		});
		completedQuiz = new Map();
	}
	manageTime(QuizRunner.activeQuizzes);
}

module.exports = new QuizRunner();
