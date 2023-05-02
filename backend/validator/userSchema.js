export const userSchema = {
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
};
