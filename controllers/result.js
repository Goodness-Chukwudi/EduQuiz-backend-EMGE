const { getResult } = require("../service/data/result"),
	createResult = require("../service/result/createResult");

const send = async (req, res) => {
	const resultId = req.params.resultId;
	const result = await getResult(resultId);
	if (result) {
		res.status(200).send(result);
	} else res.status(400).send("Invalid result Id");
};

const create = async (quiz) => {
	return await createResult(quiz);
};

module.exports = { send, create };
