const getUserSwagger = require("./userService/getUserSwagger");
const registerUserSwagger = require("./userService/registerUserSwagger");

const swaggerDocumentation = {
	openapi: "3.0.0",
	info: {
		title: "Node js API project for Mongodb By Neelakanth ",
		version: "1.0.0",
	},
	servers: [
		{
			url: "http://localhost:8080/",
			description: "Local dev",
		},
	],
	basePath: "/api/v1",
	tags: [
		{
			name: "User",
		},
	],
	paths: {
		"/api/v1/user/get-user": {
			get: getUserSwagger,
		},
		"/api/v1/user/register-user": {
			post: registerUserSwagger,
		},
	},
};

module.exports = swaggerDocumentation;
