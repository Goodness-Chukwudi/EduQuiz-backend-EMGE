"use strict";

const cors = require("cors");

module.exports = () => {
	const corsOptions = {
		origin: "http://127.0.0.1:5500",
		methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS", "HEAD"],
		credentials: true, //access-control-allow-credentials:true
		optionSuccessStatus: 200,
	};
	return cors(corsOptions);
};
