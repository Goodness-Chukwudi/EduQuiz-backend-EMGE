"use strict";

if (process.env.NODE_ENV != "production") require("dotenv").config();

const express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	auth = require("./middlewares/auth"),
	cookieParser = require("cookie-parser"),
	log = require("./utils/errorLogger"),
	cors = require("./utils/cors"),
	compression = require("compression"),
	helmet = require("helmet"),
	registerRoute = require("./routes/register"),
	loginRoute = require("./routes/login"),
	quizRoute = require("./routes/quiz"),
	logoutRoute = require("./routes/logout");

require("express-async-errors");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(compression());

//route handlers
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/quiz", auth, quizRoute);
app.use("/api/logout", logoutRoute);

// Error handlers and loggers
app.use(require("./middlewares/errorHandler"));
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

// Connect to DB
try {
	mongoose.connect(process.env.DB_CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
} catch (error) {
	console.log(error);
}

const port = process.env.PORT || 5500;
app.listen(port, () => {
	console.log(`server is listening on port ${port}`);
});
