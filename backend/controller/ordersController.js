import { getDB } from "../utils/db.js";

const COL = "orders";

export const getOrders = async (_, res) => {
	try {
		const db = await getDB();
		const result = await db.collection.find().limit(50).toArray();
		res.json(result);
	} catch (err) {
		console.log(err);
		res.status(500).end();
	}
};

export const addOrder = async (req, res) => {
	try {
		const db = await getDB();
		const result = await db.collection.insertOne(req.body);
		res.end();
	} catch (err) {
		console.log(err);
		res.status(500).end();
	}
};

export const removeOrder = async (req, res) => {
	try {
		const db = await getDB();
		const result = await db.collection.findOneAndDelete();
		res.json({ message: "Order removed successfully" });
	} catch (err) {
		console.log(err);
		res.status(500).end();
	}
};
