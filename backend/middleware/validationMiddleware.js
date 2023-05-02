import { checkSchema, validationResult } from "express-validator";

export const validateSchema = async (req, _, next) => {
	const schema = await checkSchema({
		username: {
			isEmail: true,
			errorMessage: "Invalid username",
		},
		password: {
			isLength: {
				options: { min: 8 },
				errorMessage: "Password should be at least 8 characters",
			},
		},
	});
	const result = validationResult(schema);
	if (!result.isEmpty()) {
		console.log("Failed validation", req.body);
	} else {
		console.log("Validation succeeded");
		next();
	}
};
