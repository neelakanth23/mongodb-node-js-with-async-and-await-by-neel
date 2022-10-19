const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	textContent: {
		type: String,
	},
	//timestamps: true,
});

const bookDetails = mongoose.model("book", bookSchema);
module.exports = bookDetails;
