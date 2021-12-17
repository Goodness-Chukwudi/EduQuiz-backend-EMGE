"use strict";

if (process.env.NODE_ENV != "production") require("dotenv").config();

const express = require("express");
require("express-async-errors");
const app = express(),
	mongoose = require("mongoose"),
	auth = require("./middleware/auth"),
	cookieParser = require("cookie-parser"),
	log = require("./utils/errorLogger");

app.use(express.json());
app.use(cookieParser());
app.use(require("./utils/headerSettings"));
//route handlers
app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/quiz", auth, require("./routes/quiz"));
app.use("/api/logout", require("./routes/logout"));
// Error handlers and loggers
app.use(require("./middleWare/errorHandler"));
app.use((err, req, res, next) => {
	log(err);
});

// Handle Exceptions
process.on("unhandledRejection", (err) => {
	log(err);
});
process.on("uncaughtException", (err) => {
	log(err);
});

//Connect to DB
mongoose
	.connect(process.env.DB_CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(console.log("...connected to DB"))
	.catch((ex) => {
		throw ex;
	});

const port = process.env.PORT || 5500;
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
