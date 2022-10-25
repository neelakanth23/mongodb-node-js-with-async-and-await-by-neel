const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let mongoDbConnection = mongoose.connect(process.env.MONGODBURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

async function mongooseConnection() {
	try {
		await mongoDbConnection;
		console.log("Mongodb connected successfully");
	} catch (error) {
		console.log(error);
	}
}

mongooseConnection();
