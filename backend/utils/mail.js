import nodemailer from "nodemailer";

//mailtrap
var transport = nodemailer.createTransport({
	host: "sandbox.smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "9b5fab577dca27",
		pass: "beba636775eab7",
	},
});

export const sendMail = (adress, content) => {
	var message = {
		from: "sender@server.com",
		to: adress,
		subject: "Your Login Code",
		text: content,
		html: `<h1>Hello, here is your Verification Code: ${content}</h1><p>The code expires in 30minutes.</p>`,
	};
	transport.sendMail(message, (err, info) => {
		if (err) {
			console.log(err);
			return;
		} else {
			console.log(info);
		}
	});
};
