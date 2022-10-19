const router = require("express").Router();
const upload = require("../middleware/upload");

const {
	addProperty,
	getPropertyById,
	getProperty,
	updateProperty,
	getPropertyByHotelName,
} = require("../controllers/property.controller");

router.get("/get-property", getProperty);
router.post(
	"/add-property",
	upload.fields([
		{ name: "profilePicture", maxCount: 1 },
		{ name: "gallary", maxCount: 4 },
	]),
	addProperty
);
router.put(
	"/update-property/:id",
	//upload.single("profilePicture"),
	// upload.fields([
	// 	{}
	// ]),
	updateProperty
);
router.get("/get-property/:id", getPropertyById);
router.get("/get-propertyByHotelName/:user", getPropertyByHotelName);

module.exports = router;
