"use strict";

const cors = require("cors");

const corsSettings = () => {
	const corsOptions = {
		origin: "https://eduquiz.netlify.app",
		methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS", "HEAD"],
		allowedHeaders: ["Date", "Content-Type", "Origin"],
		credentials: true,
		optionSuccessStatus: 200,
	};
	return cors(corsOptions);
};

module.exports = corsSettings;
