const { string } = require("joi");
const mongoose = require("mongoose");
const { user } = require("./user.model");

const propertySchema = new mongoose.Schema({
	hotelName: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	landMark: {
		type: String,
		required: true,
	},
	pincode: {
		type: String,
		required: true,
	},
	profilePicture: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: Number,
		requred: true,
	},
	gallary: {
		type: [String],
	},
	rating: {
		type: Number,
	},
	description: {
		type: String,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		// ref: "user",
	},
	// timestamps: true,
});

const propertyDetails = mongoose.model("property", propertySchema);
module.exports = propertyDetails;
