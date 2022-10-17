const router = require("express").Router();
const {
	createUser,
	getUser,
	getUserById,
	updateUser,
	userlogin,
	exportUsers,
} = require("../controllers/user.controller");

router.post("/register-user", createUser);
router.post("/user-login", userlogin);
router.get("/get-user", getUser);
router.get("/get-user/:id", getUserById);
router.put("/update-user/:id", updateUser);
router.get("/export-users", exportUsers);

module.exports = router;
