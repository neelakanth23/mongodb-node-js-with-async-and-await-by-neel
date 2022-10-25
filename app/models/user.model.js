const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		index: true,
	},
	password: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
	},
	phoneNumber: {
		type: Number,
		requred: true,
	},
	isVerified: {
		type: String,
	},
});

const userDetails = mongoose.model("user", userSchema);
module.exports = userDetails;
