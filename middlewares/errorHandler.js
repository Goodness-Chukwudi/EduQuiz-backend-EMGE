"use strict";

module.exports = function (err, req, res, next) {
	if (err.name === "ValidationError") {
		res.status(400).send(err.message);
	} else {
		res.status(500).send("Internal server error");
	}
	next(err);
};
