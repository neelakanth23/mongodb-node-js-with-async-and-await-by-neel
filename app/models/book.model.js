const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	country: {
		type: String,
	},
	state: {
		type: String,
	},
	city: {
		type: String,
	},
	address: {
		type: String,
	},
	pincode: {
		type: String,
	},
	account_number: {
		type: String,
	},
	ifsc: {
		type: String,
	},
	branch: {
		type: String,
	},
	//timestamps: true,
});

const bookDetails = mongoose.model("book", bookSchema);
module.exports = bookDetails;
