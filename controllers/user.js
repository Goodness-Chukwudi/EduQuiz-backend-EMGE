const { getUser, saveUser } = require("../model/storage/user"),
	Token = require("../utils/token"),
	cookie = require("cookie"),
	User = require("../model/user"),
	hash = require("../utils/hash"),
	bcrypt = require("bcrypt");

const register = async (req, res) => {
	let existingUser = await getUser(req.body.userId);
	if (existingUser) return res.status(400).send("This user already exist!");

	// Create and save user
	req.body.password = await hash(req.body.password);
	let user = new User(req.body);
	user = await saveUser(user);

	//generate token and send as cookie
	res = await setTokenCookie(res, user);

	//send back user without password
	user.password = "";
	res.status(200).send(user);
};

const login = async (req, res) => {
	const user = await getUser(req.body.userId);
	if (!user) return res.status(401).send("Invalid email or password!");
	// Compare user details
	const valid = await bcrypt.compare(req.body.password, user.password);
	if (!valid) return res.status(401).send("Invalid email or password!");

	//generate token and send as cookie
	res = await setTokenCookie(res, user);

	//send back user without password
	user.password = "";
	res.status(200).send(user);
};

const logout = (req, res) => {
	res.setHeader(
		"Set-Cookie",
		cookie.serialize("eduQuiz-sessionCookie-content", "", {
			httpOnly: true,
			sameSite: "none",
			secure: true,
			maxAge: 1,
		})
	);
	res.status(200).send("Logged out");
};

const send = (req, res) => {
	const user = req.user;
	if (user) {
		res.status(200).send(user);
	} else res.status(400).send("Error! User not found!");
};

async function setTokenCookie(res, user) {
	const token = await Token.generate(user);
	res.setHeader(
		"Set-Cookie",
		cookie.serialize("eduQuiz-sessionCookie-content", token, {
			httpOnly: true,
			sameSite: "none",
			secure: true,
			maxAge: 60 * 60 * 1000,
		})
	);
	return res;
}

module.exports = { register, login, logout, send };
