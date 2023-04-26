import jwt from "jsonwebtoken";

export const createJWToken = (claim) => {
	const token = jwt.sign(claim, process.env.JWT_SECRET, { expiresIn: "30min" });
	return token;
};

export const verifyJWToken = (token) => {
	const verification = jwt.verify(token, process.env.JWT_SECRET);
	return verification;
};
