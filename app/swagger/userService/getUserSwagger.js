module.exports = getUserSwagger = {
	tags: ["User"],
	description: "Get all the available User",
	summary: "Use this API to Get all the User",
	operationId: "getUser",
	consumes: ["application/json"],
	produces: ["application/json"],
	responses: {
		200: {
			description: "Successfully triggered the Get all User API",
		},
	},
};
