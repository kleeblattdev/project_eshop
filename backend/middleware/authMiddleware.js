import createHmac from "crypto";
import { verifyJWToken } from "../utils/token";

export const encryptPassword = (req, _, next) => {
	const hmac = createHmac("sha256", req.body.password);
	req.body.password = hmac.digest("hex");
	next();
};

export const verifyJWTCookie = (req, res, next) => {
	const token = req.cookies.access_token;
	try {
		const claim = verifyJWToken(token);
		req.claim = claim;
		next();
	} catch (err) {
		console.log(err);
		res.status(401).end();
	}
};
