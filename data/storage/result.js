"use strict";

const Result = require("../model/result"),
	{ Quiz } = require("../model/quiz");

async function saveResult(input) {
	return await new Result(input).save();
}

async function getAnswers(id) {
	const value = await Quiz.findById(id).select({ questions: 1 });
	return value.questions;
}

async function getResult(id) {
	return await Result.findById(id);
}

module.exports = { saveResult, getAnswers, getResult };
