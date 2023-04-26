import { getDB } from "../utils/db.js";
import { createJWToken } from "../utils/token.js";

const COL = "client";

const checkClient = async (user) => {
	const db = await getDB();
	const result = await db.collection(COL).findOne({ user });
	if (result === null) {
		return true;
	} else {
		return false;
	}
};

export const register = async (req, res) => {
	const db = await getDB();
	if (await checkClient(req.body.user)) {
		await db.collection(COL).insertOne(req.body);
		res.end();
	} else {
		res.status(401).end();
	}
};

export const login = async (req, res) => {
	const db = await getDB();
	const response = await db
		.collection(COL)
		.findOne({ user: req.body.user, password: req.body.password });
	if (response === null) {
		res.status(401).end();
	} else {
		const token = createJWToken({ user: response._id });
		res.cookie("access_token", token, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
		});
		res.end();
	}
};

export const logout = async (_, res) => {
	return res.clearCookie("access_token").end();
};
