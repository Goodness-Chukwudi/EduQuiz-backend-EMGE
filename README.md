#TO-Do
Resume an accidentaly closed quiz
Limit the number of times a user can take a particular quiz
track answered questions on the quiz platform

# EduQuiz-backend-EMGE

EduQuiz-backend A computer-based-test application built with Node JS, Express JS and MongoDB. A user creates a quiz and generates a quiz ID. Any registered user can login and take the quiz with the given ID.

# API COLLECTION DOCUMENTATION

# POST => /api/register

body => {
"userId": "user@gmail.com",
"password": "12345678"
}

response => {
"userId": "user@gmail.com",
"password": "",
"results": [{
"id": "61bc82d91d6a026622a8fc20",
"title": "Demo Quiz Title",
"score": 20,
}],
"quizzes": [{
"id": "61bc828f1d6a026622a8fbeb",
"title": "Demo Quiz Title",
"candidates": 1,
}],
}

# POST => /api/login

body => {
"userId": "user@gmail.com",
"password": "12345678"
}

response => {
"userId": "user@gmail.com",
"password": "",
"results": [{
"id": "61bc82d91d6a026622a8fc20",
"title": "Demo Quiz Title",
"score": 20,
}],
"quizzes": [{
"id": "61bc828f1d6a026622a8fbeb",
"title": "Demo Quiz Title",
"candidates": 1,
}],
}

# POST => /api/quiz // creates a new quiz

body => {
"title": "Demo Quiz 1",
"duration": 30,
"totalScore": 100,
"questions": [
{
"num": 1,
"question": "This is question 1",
"options": [
"option Q1 1",
"option Q1 2",
"option Q1 3",
"option Q1 4",
"option Q1 5"
],
"answer": "option Q1 1",
"score": 20
}]
}

response => {
"userId": "user@gmail.com",
"password": "",
"results": [{
"id": "61bc82d91d6a026622a8fc20",
"title": "Demo Quiz Title",
"score": 20,
}],
"quizzes": [{
"id": "61bc828f1d6a026622a8fbeb",
"title": "Demo Quiz Title",
"candidates": 1,
}],
}

# GET => /api/quiz/take-quiz/<quizId> //starts a test

response => {
"title": "Demo Quiz Title",
"duration": 5,
"totalScore": 100,
"questions": [{
"num": 1,
"question": "Demo Question 1",
"options": ["option 1", "option 2", "option 3", "option 4", "option 5"],
"answer": "option 1",
"score": 20,
}, ],
}

# PUT => /api/quiz/update-answer //updates answer in the app while quiz is going on

body => {
"questionNum": 1,
"answer": "option Q1 1",
"isCompleted": false //the last update will have isCompleted = true
}

response => status 200

# GET => /api/quiz/get-result/<resultId>

response => {
"title": "Demo Quiz Title",
"timeLeft": 4,
"totalScore": 20,
"questions": [{
"num": 1,
"question": "Demo Question 1",
"options": ["option 1", "option 2", "option 3", "option 4", "option 5"],
"answer": "option 1",
"score": 20
}],
"quizId": "61bc828f1d6a026622a8fbeb",
"isSubmitted": true
}

# GET => /api/quiz/get-quiz/<quizId>

response => {
"title": "Demo Quiz Title",
"duration": 5,
"totalScore": 100,
"questions": [{
"num": 1,
"question": "Demo Question 1",
"options": ["option 1", "option 2", "option 3", "option 4", "option 5"],
"answer": "option 1",
"score": 20
}]
}

# GET => /api/quiz/user

response => {
"userId": "user@gmail.com",
"password": "",
"results": [{
"id": "61bc82d91d6a026622a8fc20",
"title": "Demo Quiz Title",
"score": 20,
}],
"quizzes": [{
"id": "61bc828f1d6a026622a8fbeb",
"title": "Demo Quiz Title",
"candidates": 1,
}],
}

# GET => /api/logout

response => status 200

# Required environment variables

DB_CONNECTION_STRING = "mongodb://localhost/edu-quiz"
DB_ERROR_LOGS = "mongodb://localhost/edu-quiz-logs"
NODE_ENV = "development"
JWTPrivateKey = "JSON web token private key"
