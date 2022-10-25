const userDetails = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const exceljs = require("exceljs");
const nodemailer = require("nodemailer");
const { name } = require("ejs");

//to send mail

const sendVerifyMail = async (userName, email, user_id) => {
	try {
		const transporter = await nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secureConnection: "false",
			tls: {
				rejectUnauthorized: false,
			},
			auth: {
				user: "nmuchalambe@gmail.com",
				pass: "",
			},
		});
		console.log(email);
		const mailOption = {
			from: "nmuchalambe@gmail.com",
			to: email,
			subject: "For verification mail",
			html:
				"<p>Hii " +
				userName +
				', please click here to <a href="http://localhost:8080/api/v1/user/verify?id=' +
				user_id +
				'"> verify </a> your mail.</p>',
		};
		transporter.sendMail(mailOption, function (error, info) {
			if (error) {
				return console.log(error);
			} else {
				return console.log("Email has been sent:-", info.response);
			}
		});
	} catch (err) {
		return console.log(err.message);
	}
};

const verifyMail = async (req, res) => {
	try {
		console.log(req, "djfebb");
		const updateInfo = await userDetails.updateOne(
			{ _id: req.query.id },
			{ $set: { isVerified: 1 } }
		);
		console.log(updateInfo);
		return res.status(200).json({
			error: false,
			message: "email-verified",
		});
	} catch (err) {
		return console.log(err.message);
	}
};

const createUser = async (req, res, next) => {
	try {
		const { userName, email, password, phoneNumber } = req.body;
		let user = await userDetails.find({
			email,
		});

		if (user.length > 0) {
			res.status(200).json({
				error: true,
				message: "User exist with a email id",
			});
		}
		const salt = await bcrypt.genSalt(10);
		const dt = await bcrypt.hash(password, salt);
		const userData = await userDetails.create({
			userName,
			email,
			password: dt,
			phoneNumber,
		});
		if (userData) {
			sendVerifyMail(req.body.userName, req.body.email, userData._id);
		}
		return res.status(200).json({
			error: false,
			message:
				"Your registration has been done successfully, please verify your email.",
			response: userData,
		});
		jwt.sign(
			payload,
			"randomString",
			{
				expiresIn: 10000,
			},
			(err, token) => {
				if (err) throw err;
				res.status(200).json({
					token,
				});
			}
		);
	} catch (err) {
		next(err);
	}
};

const userlogin = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		let userData = await userDetails.findOne({ email: email });

		if (userData) {
			const passwordMatch = await bcrypt.compare(
				password,
				userData.password
			);
			if (passwordMatch) {
				res.status(200).json({
					error: false,
					message: "Login successfully",
					response: userData,
				});
			} else {
				res.status(500);
				res.json({
					error: true,
					message:
						"Email and Password are incorrect, please enter the correct Email and password!",
				});
			}
		} else {
			res.status(500);
			res.json({
				error: true,
				message:
					"Email and Password are incorrect, please enter the correct Email and password!",
			});
		}
	} catch (err) {
		next(err);
	}
};

const getUser = async (req, res, next) => {
	try {
		let user = await userDetails.find();
		res.status(200).json({
			error: false,
			message: "User fetched successfully",
			response: user,
		});
	} catch (error) {
		next(err);
	}
};

const getUserById = async (req, res, next) => {
	try {
		let user = await userDetails.findOne({ _id: req.params.id });
		res.status(200).json({
			error: false,
			message: "User fetched successfully",
			response: user,
		});
	} catch (error) {
		next(err);
	}
};

const updateUser = async (req, res, next) => {
	try {
		const { userName, email, password, phoneNumber } = req.body;

		if (password.length > 0) {
			const salt = await bcrypt.genSalt(10);
			const dt = await bcrypt.hash(password, salt);
			const userData = await userDetails.findByIdAndUpdate(
				{ _id: req.params.id.trim() },
				{
					userName,
					email,
					password: dt,
					phoneNumber,
				}
			);

			res.status(200).json({
				error: false,
				message: "user details updated successfully",
			});
		} else {
			const userData = await userDetails.findByIdAndUpdate(
				{ _id: req.params.id.trim() },
				{
					$set: req.body,
				}
			);
		}
	} catch (err) {
		next(err);
	}
};

const exportUsers = async (req, res, next) => {
	try {
		const workbook = new exceljs.Workbook();
		const worksheet = workbook.addWorksheet("My Users");

		worksheet.columns = [
			{ header: "Sl.no", key: "sl_no" },
			{ header: "Username", key: "userName" },
			{ header: "email", key: "email" },
			{ header: "Password", key: "password" },
			{ header: "PhoneNumber", key: "phoneNumber" },
		];
		let counter = 1;

		const userData = await userDetails.find();

		userData.forEach((user) => {
			user.sl_no = counter;
			worksheet.addRow(user);
			counter++;
		});
		worksheet.getRow(1).eachCell((cell) => {
			cell.font = { bold: true };
		});

		res.setHeader(
			"Content-Type",
			"application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
		);

		res.setHeader("Content-Disposition", `attachment; filename=users.xlsx`);

		return workbook.xlsx.write(res).then(() => {
			res.status(200);
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	createUser,
	getUser,
	getUserById,
	updateUser,
	userlogin,
	exportUsers,
	verifyMail,
};

// const updateUser = async (req, res) => {
// 	const { userName, email, phoneNumber } = req.body;
// 	let user = await userDetails.findByIdAndUpdate(req.params.id, {
// 		$set: req.body,
// 	});

// 	res.status(200).json({
// 		error: false,
// 		message: "User updated successfully",
// 		response: user,
// 	});
// };

// const updateUser = async (req, res, next) => {
// 	try {
// 		const { userName, email, password, phoneNumber } = req.body;

// 		if (password.length > 0) {
// 			const salt = await bcrypt.genSalt(10);
// 			const dt = await bcrypt.hash(password, salt);
// 			const userData = await userDetails.findByIdAndUpdate(
// 				{ _id: req.params.id.trim() },
// 				{
// 					userName,
// 					email,
// 					password: dt,
// 					phoneNumber,
// 				}
// 			);

// 			res.status(200).json({
// 				error: false,
// 				message: "user details updated successfully",
// 			});
// 		} else {
// 			const userData = await userDetails.findByIdAndUpdate(
// 				{ _id: req.params.id.trim() },
// 				{
// 					userName,
// 					email,
// 					password,
// 					phoneNumber,
// 				}
// 			);
// 			// res.status(200).json({
// 			// 	error: false,
// 			// 	message: "User updated successfully",
// 			// 	response: userData,
// 			// });
// 			// jwt.sign(
// 			// 	payload,
// 			// 	"randomString",
// 			// 	{
// 			// 		expiresIn: 10000,
// 			// 	},
// 			// 	(err, token) => {
// 			// 		if (err) throw err;
// 			// 		res.status(200).json({
// 			// 			token,
// 			// 		});
// 			// 	}
// 			// );
// 		}
// 	} catch (err) {
// 		next(err);
// 	}
// };
