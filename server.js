const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const openApiDocumentation = require("./app/swagger/documentation");
// const swaggerDoc = require("swagger-ui-express");
// const swaggerDocumentation = require("./app/swagger/documentation");

//const YAML = require("yamljs");
//const swaggerDocument = YAML.load("./swagger.yaml");
//const swaggerUi = require("swagger-ui-express");

//const bodyParser = require("bodyParser");

require("dotenv").config();

require("./app/config/db.config");

//const swaggerSpec = swaggerjsDoc(options);
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use("/documentations", swaggerDoc.serve);
// app.use("/documentations", swaggerDoc.setup(swaggerDocumentation));

app.use(
	"/api/v1/swagger",
	// (req, res, next) => {
	// 	openApiDocumentation.host = req.get("host");
	// 	req.swaggerDoc = openApiDocumentation;
	// 	next();
	// },
	swaggerUi.serve,
	swaggerUi.setup(openApiDocumentation)
);

var corsOptions = {
	origin: "http://localhost:8081",
};
app.use(bodyParser.json());

app.use(cors("*"));

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json({ limit: "5mb" }));

//importing routes

const userRouter = require("./app/routes/user.route");
app.use("/api/v1/user", userRouter);

const shopRouter = require("./app/routes/shop.route");
app.use("/api/v1/shop", shopRouter);

const propertyRouter = require("./app/routes/property.route");
app.use("/api/v1/property", propertyRouter);

const bookRouter = require("./app/routes/book.route");
app.use("/api/v1/book", bookRouter);

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

