"use strict";

const Result = require("../result"),
	Quiz = require("../quiz");

async function saveResult(input) {
	return await new Result(input).save();
}

async function getAnswers(id) {
	const value = await Quiz.findById(id).select({ questions: 1 });
	//return value;
	return value.questions;
}

async function getResult(id) {
	return await Result.findById(id);
}

module.exports = { saveResult, getAnswers, getResult };
