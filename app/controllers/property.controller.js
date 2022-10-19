const { json } = require("body-parser");
const propertyDetails = require("../models/property.model");

const addProperty = async (req, res, next) => {
	try {
		const {
			hotelName,
			country,
			state,
			city,
			landMark,
			pincode,
			email,
			phoneNumber,
			description,
			user,
		} = req.body;
		console.log(req.files, "multi");

		const url = req.protocol + "://" + req.get("host");

		let image =
			url +
			"/app/middleware/uploads/" +
			req.files.profilePicture[0].filename;
		console.log(req.files, "ffffffff");
		console.log(image);

		const morefiles = req.files.gallary;
		console.log(morefiles, "more");

		let images = [];
		for (i = 0; i < morefiles.length; i++) {
			let elementsofimages =
				url +
				"/app/middleware/uploads/" +
				req.files.gallary[i].filename;
			images.push(elementsofimages);
		}
		console.log(images);
		let property = await propertyDetails.find({
			hotelName,
		});
		if (property.length > 0) {
			res.status(200).json({
				error: false,
				message: "property with this name already exist",
				response: property,
			});
		} else {
			const propertyData = await propertyDetails.create({
				hotelName,
				country,
				state,
				city,
				landMark,
				pincode,
				email,
				profilePicture: image,
				phoneNumber,
				gallary: images,
				description,
				user,
			});
			res.status(200).json({
				error: false,
				message: "property created successfully",
				Response: propertyData,
			});
		}
	} catch (err) {
		next(err);
	}
};

const getProperty = async (req, res, next) => {
	try {
		let property = await propertyDetails.find();
		res.status(200).json({
			error: false,
			message: "property detail fetch successfully",
			response: property,
		});
	} catch (err) {
		next(err);
	}
};

const getPropertyById = async (req, res, next) => {
	let property = await propertyDetails.findById({ _id: req.params.id });
	console.log(property);
	if (!property) {
		res.status(500).json({
			error: true,
			message: "property with this Id doesnot exist",
			response: property,
		});
	} else {
		let property = await propertyDetails.findOne({ _id: req.params.id });
		res.status(200).json({
			error: false,
			message: "property fetched successfully ",
			response: property,
		});
	}
};

const getPropertyByHotelName = async (req, res, next) => {
	try {
		const userName = req.params["user"];
		const pipeline = [
			{
				$lookup: {
					from: "users",
					localField: "user",
					foreignField: "_id",
					as: "users",
				},
			},
			{
				$project: {
					hotelName: 1,
					country: 1,
					state: 1,
					city: 1,
					landMark: 1,
					pincode: 1,
					email: 1,
					profilePicture: 1,
					phoneNumber: 1,
					gallary: 1,
					description: 1,
					users: {
						$filter: {
							input: "$users",
							as: "users",
							cond: {
								$eq: ["$$users.userName", userName],
							},
						},
					},
				},
			},
			{
				$unwind: {
					path: "$users",
				},
			},
		];
		console.log(pipeline);
		const property = await propertyDetails.aggregate(pipeline);
		res.status(200).json({
			error: false,
			message: "property fetched successfully ",
			response: property,
		});
	} catch (err) {
		next(err);
	}
};

const updateProperty = async (req, res, next) => {
	try {
		const {
			hotelName,
			country,
			state,
			city,
			landMark,
			pincode,
			email,
			phoneNumber,
			description,
			user,
		} = req.body;
		console.log(req.body);

		if (req.files) {
			const url = req.protocol + "://" + req.get("host");
			let image = url + "/app/middleware/uploads/" + req.file.filename;
			console.log(image);
			const propertyData = await propertyDetails.findByIdAndUpdate(
				{
					_id: req.params.id,
				},
				{
					hotelName,
					country,
					state,
					city,
					landMark,
					pincode,
					email,
					profilePicture: image,
					phoneNumber,
					description,
					user,
				}
			);
			res.status(200).json({
				error: false,
				message: "profilePicture updated successfully",
				Response: propertyData,
			});
		}
		if (req.files) {
			const url = req.protocol + "://" + req.get("host");
			let images = url + "/app/middleware/uploads/" + req.files.filename;
			console.log(images);
			const propertyData = await propertyDetails.findByIdAndUpdate(
				{
					_id: req.params.id,
				},
				{
					hotelName,
					country,
					state,
					city,
					landMark,
					pincode,
					email,
					gallary: images,
					phoneNumber,
					description,
					user,
				}
			);
			res.status(200).json({
				error: false,
				message: "Gallary images updated successfully",
				Response: propertyData,
			});
		} else {
			const propertyData = await propertyDetails.findByIdAndUpdate(
				{
					_id: req.params.id,
				},
				{
					hotelName,
					country,
					state,
					city,
					landMark,
					pincode,
					profilePicture,
					email,
					phoneNumber,
					description,
					gallary,
					user,
				}
			);
			res.status(200).json({
				error: false,
				message: "shop updated successfully",
				Response: propertyData,
			});
		}
	} catch (err) {
		next(err);
	}
};

module.exports = {
	addProperty,
	getProperty,
	getPropertyById,
	updateProperty,
	getPropertyByHotelName,
};
