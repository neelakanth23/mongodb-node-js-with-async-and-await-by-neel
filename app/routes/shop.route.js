const router = require("express").Router();
const upload = require("../middleware/upload");

const {
	createShop,
	getShopById,
	getShop,
	updateShop,
	getShopByUserName,
} = require("../controllers/shop.controller");

// var yourModule = require("../controllers/shop.controller");

router.get("/get-shop", getShop);
router.post("/create-shop", upload.single("shopPicture"), createShop);
router.put("/update-shop/:id", upload.single("shopPicture"), updateShop);
router.get("/get-shop/:id", getShopById);
router.get("/get-shopByUser/:user", getShopByUserName);

module.exports = router;
