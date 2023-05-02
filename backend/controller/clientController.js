import { getDB } from "../utils/db.js";
import { sendMail } from "../utils/mail.js";
import { createMailToken } from "../utils/token.js";

const COL = "client";

const checkClient = async (username) => {
	const db = await getDB();
	const result = await db.collection(COL).findOne({ username });
	if (result === null) {
		return true;
	} else {
		return false;
	}
};

export const register = async (req, res) => {
	const db = await getDB();
	if (await checkClient(req.body.username)) {
		await db.collection(COL).insertOne(req.body);
		res.send({ message: "successfully registered" }).end();
	} else {
		res.status(401).send({ message: "This email is already registered" }).end();
	}
};

export const login = async (req, res) => {
	const db = await getDB();
	const response = await db
		.collection(COL)
		.findOne({ user: req.body.username, password: req.body.password });
	if (response === null) {
		res
			.status(401)
			.send({ message: "Did you type the wrong email or password?" })
			.end();
	} else {
		const mailToken = createMailToken({ username: response._id });
		sendMail(result.email, mailToken);
		res.json({ token: mailToken.token });
	}
};

export const logout = async (_, res) => {
	return res.clearCookie("access_token").end();
};
