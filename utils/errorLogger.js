"use strict";

const winston = require("winston");
require("winston-mongodb");

module.exports = function (err) {
	if (process.env.NODE_ENV != "production") {
		winston.add(
			new winston.transports.Console({
				format: winston.format.prettyPrint(),
			})
		);
		winston.log({
			level: "error",
			message: err.message,
			stack: err.stack,
		});
	} else {
		winston.add(
			new winston.transports.File({
				filename: "errorLog.log",
				format: winston.format.prettyPrint(),
			})
		);
		winston.add(
			new winston.transports.MongoDB({
				db: process.env.DB_ERROR_LOGS,
				options: {
					useNewUrlParser: true,
					useUnifiedTopology: true,
				},
			})
		);

		winston.log({
			level: "error",
			message: err.message,
			metadata: err,
		});
	}
};
