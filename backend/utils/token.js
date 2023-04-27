import jwt from "jsonwebtoken";

export const createJWToken = (claim) => {
	return jwt.sign(claim, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const verifyJWToken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET);
};

export const createMailToken = (claim) => {
	const secret = createSecret(1000, 9999);
	const token = jwt.sign(claim, secret + process.env.JWT_MAIL_SECRET, {
		expiresIn: "30m",
	});
	return { secret, token };
};

export const verifyMailToken = (token, secret) => {
	return jwt.verify(token, secret + process.env.JWT_SECRET);
};

const createSecret = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min);
};
