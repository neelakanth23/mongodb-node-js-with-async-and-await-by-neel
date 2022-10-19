const { json } = require("body-parser");
const shopDetails = require("../models/shop.model");

const createShop = async (req, res, next) => {
	try {
		const { shopName, ownerName, address, phoneNumber, user } = req.body;
		console.log(req.body);

		const url = req.protocol + "://" + req.get("host");

		let image = url + "/app/middleware/uploads/" + req.file.filename;
		console.log(image);
		console.log(shopDetails);
		if (req.file) {
			shopDetails.shopPicture = req.file.path;
		}
		let shop = await shopDetails.find({
			shopName,
		});
		if (shop.length > 0) {
			res.status(200).json({
				error: false,
				message: "shop with this name already exist",
				response: shop,
			});
		} else {
			const shopData = await shopDetails.create({
				shopName,
				shopPicture: image,
				ownerName,
				address,
				phoneNumber,
				user,
			});
			res.status(200).json({
				error: false,
				message: "shop created successfully",
				Response: shopData,
			});
		}
	} catch (err) {
		next(err);
	}
};

const getShop = async (req, res, next) => {
	try {
		let shop = await shopDetails.find();
		res.status(200).json({
			error: false,
			message: "shop detail fetch successfully",
			response: shop,
		});
	} catch (err) {
		next(err);
	}
};

const getShopById = async (req, res, next) => {
	//let shop = await shopDetails.findOne({ _id: req.params.id });
	let shops = await shopDetails.findById({ _id: req.params.id });
	console.log(shops);
	if (!shops) {
		res.status(500).json({
			error: true,
			message: "shop with this Id doesnot exist",
			response: shops,
		});
	} else {
		let shop = await shopDetails.findOne({ _id: req.params.id });
		res.status(200).json({
			error: false,
			message: "shop fetched successfully ",
			response: shop,
		});
	}
};

const getShopByUserName = async (req, res, next) => {
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
					shopName: 1,
					address: 1,
					phoneNumber: 1,
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
		const shop = await shopDetails.aggregate(pipeline);
		res.status(200).json({
			error: false,
			message: "shop fetched successfully ",
			response: shop,
		});
	} catch (err) {
		next(err);
	}
};

// const updateShop = async (req, res, next) => {
// 	try {
// 		const { shopName, ownerName, address, phoneNumber, user } = req.body;

// 		let shops = await shopDetails.findById({ _id: req.params.id });
// 		console.log(shops);
// 		if (!shops) {
// 			res.status(500).json({
// 				error: true,
// 				message: "shop with this Id doesnot exist",
// 			});
// 		}
// 		if (shops.shopName !== req.body.ShopName) {
// 			shops.shopName = req.body.ShopName;
// 		}
// 		if (shops.ownerName !== req.body.ownerName) {
// 			shops.ownerName = req.body.ownerName;
// 		}
// 		if (shops.address !== req.body.address) {
// 			shops.address = req.body.address;
// 		}
// 		if (shops.phoneNumber !== req.body.phoneNumber) {
// 			shops.phoneNumber = req.body.phoneNumber;
// 		}

// 		if (shops.shopPicture !== req.file.shopPicture) {
// 			const url = req.protocol + "://" + req.get("host");
// 			let image = url + "/app/middleware/uploads/" + req.file.filename;
// 			const shopData = await shopDetails.findByIdAndUpdate({
// 				_id: req.params.id,
// 			});
// 			shops.shopPicture = image;
// 		} else {
// 			const shopData = await shopDetails.findByIdAndUpdate(
// 				{ _id: req.params.id.trim() },
// 				{
// 					$set: req.body,
// 				}
// 			);
// 		}
// 	} catch (err) {
// 		next(err);
// 	}
// };

const updateShop = async (req, res, next) => {
	try {
		const { shopName, ownerName, address, phoneNumber, user } = req.body;
		console.log(req.body.shopName);

		if (req.file) {
			const url = req.protocol + "://" + req.get("host");
			let image = url + "/app/middleware/uploads/" + req.file.filename;
			console.log(image);
			const shopData = await shopDetails.findByIdAndUpdate({
				_id: req.params.id,
			});

			if (shopData.shopName !== req.body.ShopName) {
				shopData.shopName = req.body.ShopName;
			}
			if (shopData.ownerName !== req.body.ownerName) {
				shopData.ownerName = req.body.ownerName;
			}
			if (shopData.address !== req.body.address) {
				shopData.address = req.body.address;
			}
			if (shopData.phoneNumber !== req.body.phoneNumber) {
				shopData.phoneNumber = req.body.phoneNumber;
			}
			if (shopData.shopPicture !== req.file.shopPicture) {
				shopData.shopPicture = image;
			}

			// res.status(200).json({
			// 	error: false,
			// 	message: "shop image updated successfully",
			// 	Response: shopData,
			// });
		} else {
			const shopData = await shopDetails.findByIdAndUpdate(
				{
					_id: req.params.id,
				},
				{
					shopName,
					shopPicture,
					ownerName,
					address,
					phoneNumber,
					user,
				}
			);
			res.status(200).json({
				error: false,
				message: "shop updated successfully",
				Response: shopData,
			});
		}
	} catch (err) {
		next(err);
	}
};

// const updateShop = async (req, res, next) => {
// 	try {
// 		const { shopName, ownerName, address, phoneNumber } = req.body;
// 		console.log(req.body);

// 		const url = req.protocol + "://" + req.get("host");

// 		let image = url + "/app/middleware/uploads/" + req.file.filename;
// 		console.log(image);

// 		if (req.file) {
// 			shopDetails.shopPicture = req.file.path;
// 		}

// 		let shop = await shopDetails.findByIdAndUpdate(
// 			{ _id: req.params.id },
// 			image
// 		);
// 		console.log(shop);
// 		res.status(200).json({
// 			error: false,
// 			message: "shop details updated successfully",
// 			response: shop,
// 		});
// 	} catch (err) {
// 		next(err);
// 	}
// };

module.exports = {
	createShop,
	getShop,
	getShopById,
	updateShop,
	getShopByUserName,
};
