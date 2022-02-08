"use strict";

const cors = require("cors");

const corsSettings = () => {
	const corsOptions = {
		origin: "https://eduquiz.netlify.app",
		// origin: "https://127.0.0.1:5500",
		methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS", "HEAD"],
		allowedHeaders: ["Date", "Content-Type", "Origin"],
		credentials: true,
		optionSuccessStatus: 200,
	};
	return cors(corsOptions);
};

module.exports = corsSettings;
