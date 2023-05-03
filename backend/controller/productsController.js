import { getDB } from "../utils/db.js";

const COL = "products";

export const getProducts = async (_, res) => {
	const db = await getDB();
	const result = await db.collection(COL).find().limit(50).toArray();
	if (result === null) {
		res.end();
	} else {
		res.json(result);
	}
};

export const addProduct = async (req, res) => {
	const db = await getDB();
	const result = await db.collection(COL).insertOne(req.body);
	res.json({ message: "Product added successfully" });
};

export const deleteProduct = async (_, res) => {
	const db = await getDB();
	const result = await db.collection(COL).findOneAndDelete();
	res.json({ message: "Product deleted successfully" });
};
