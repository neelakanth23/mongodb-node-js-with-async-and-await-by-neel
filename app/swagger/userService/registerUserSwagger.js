const requestBody = {
	type: "object",
	properties: {
		userName: {
			type: String,
			required: true,
			example: "Neelakanth",
		},
		email: {
			type: String,
			required: true,
			unique: true,
			index: true,
			example: "nmuchalambe@gmail.com",
		},
		password: {
			type: String,
			required: true,
			example: "Rgggt$3r89*",
		},
		phoneNumber: {
			type: Number,
			requred: true,
			example: "8904129246",
		},
	},
};

module.exports = registerSwagger = {
	tags: ["User"],
	description: "Create User Profile",
	summary: "Use this API to create a new User Profile",
	operationId: "createUser",
	consumes: ["application/json"],
	produces: ["application/json"],
	requestBody: {
		content: {
			"application/json": {
				schema: requestBody,
			},
		},
		required: true,
	},
	responses: {
		200: {
			description: "Successfully triggered the CREATE User Profile API",
		},
	},
};
