const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

//const bodyParser = require("bodyParser");

require("dotenv").config();

require("./app/config/db.config");

var corsOptions = {
	origin: "http://localhost:8081",
};
app.use(bodyParser.json());

app.use(cors(corsOptions));

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json({ limit: "5mb" }));

//importing routes

const userRouter = require("./app/routes/user.route");
app.use("/user", userRouter);

const shopRouter = require("./app/routes/shop.route");
app.use("/shop", shopRouter);

const propertyRouter = require("./app/routes/property.route");
app.use("/property", propertyRouter);

const bookRouter = require("./app/routes/book.route");
app.use("/book", bookRouter);

app.use(express.static(__dirname));
// app.use("/app/uploads", express.static("uploads"));
app.use("/", (req, res) => {
	res.status(200).json({
		error: false,
		message: "Shopping",
	});
});
app.use((err, req, res, next) => {
	if (err) {
		res.status(500).json({ error: true, message: err.message });
	}
	console.log(err);
});

let port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`App is running on  ${port}`);
});
