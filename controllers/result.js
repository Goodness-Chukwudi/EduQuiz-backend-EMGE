const { getResult } = require("../model/storage/result");

const send = async (req, res) => {
	const resultId = req.params.resultId;
	const result = await getResult(resultId);
	if (result) {
		res.status(200).send(result);
	} else res.status(400).send("Invalid result Id");
};

module.exports = { send };
