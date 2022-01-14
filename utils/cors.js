"use strict";

const cors = require("cors");

const corsSettings = () => {
	const corsOptions = {
		origin: "https://127.0.0.1",
		methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS", "HEAD"],
		allowedHeaders: [
			"Date",
			"Content-Type",
			"Access-Control-Allow-Headers",
			"Origin",
		],
		credentials: true,
		optionSuccessStatus: 200,
	};
	return cors(corsOptions);
};

module.exports = corsSettings;
