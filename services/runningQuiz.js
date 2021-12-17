"use strict";

const { saveResult, getAnswers } = require("../data/storage/result"),
	{ getUser, updateResultList } = require("../data/storage/user");

let map = new Map(),
	completedQuiz = new Map(),
	intervalId;

function RunQuiz() {
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
	quizList.forEach((quiz, user) => {
		//if quiz is timed out, add to list of completed quizzes
		if (quiz.timeLeft <= 0) {
			completedQuiz.set(user, quiz);
		} else {
			quiz.timeLeft--;
			quizList.set(user, quiz);
		}
	});

	RunQuiz.activeQuizzes = quizList;
	endQuiz();
}

function endQuiz() {
	let answers = [];
	if (completedQuiz.size > 0) {
		completedQuiz.forEach((quiz, userId) => {
			RunQuiz.activeQuizzes.delete(userId);
			// compute and save result
			getAnswers(quiz.quizId).then((val) => {
				answers = val;
				computeResult(quiz, answers, userId);
			});
		});
		completedQuiz = new Map();
	}
	manageTime(RunQuiz.activeQuizzes);
}

function computeResult(result, answers, userId) {
	result.questions.map((question, i) => {
		if (question.answer !== answers[i].answer) question.score = 0;
		result.questions[i] = question;
		result.totalScore += question.score;
	});

	result.isSubmitted = true;

	//Save the updated result and add the result id to the user info
	saveResult(result).then(() => {
		/*add the result id to user details*/
		getUser(userId).then((user) => {
			updateResultList(result, user);
		});
	});
}

module.exports = new RunQuiz();
