const mongoose = require("mongoose");
const { user } = require("./user.model");

const shopSchema = new mongoose.Schema({
	shopName: {
		type: String,
		required: true,
	},
	shopPicture: {
		type: String,
	},
	ownerName: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: Number,
		requred: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		// ref: "user",
	},
	// timestamps: true,
});

const shopDetails = mongoose.model("shop", shopSchema);
module.exports = shopDetails;
