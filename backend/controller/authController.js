import { createJWToken, verifyMailToken } from "../utils/token.js";

export const checkMailToken = async (req, res) => {
	const mailToken = req.headers["Authorization"].split(" ")[1];
	const secret = req.body.secret;
	try {
		const claim = verifyMailToken(mailToken, secret);
		const token = createJWToken({ user: claim.user });
		res.cookie("access_token", token, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
		});
		res.end();
	} catch (err) {
		console.log(err);
		res
			.status(401)
			.send({ message: "Are you sure this is the right code?" })
			.end();
	}
};
