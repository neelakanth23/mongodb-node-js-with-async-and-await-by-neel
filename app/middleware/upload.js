const path = require("path");
const multer = require("multer");

var Storage = multer.diskStorage({
	destination: function (req, file, cb) {
		//cb(null, "../middleware");
		cb(null, path.join(__dirname, "uploads"));
	},
	filename: function (req, file, cb) {
		let ext = path.extname(file.originalname);
		cb(null, Date.now() + ext);
	},
});

var upload = multer({
	storage: Storage,
	fileFilter: function (req, file, callback) {
		if (
			file.mimetype == "image/png" ||
			file.mimetype == "image/jpg" ||
			file.mimetype.split("/")[1] === "pdf"
		) {
			callback(null, true);
		} else {
			console.log("only jpg & png file supported!");
			callback(null, false);
		}
		// if (file.mimetype.split("/")[1] === "pdf") {
		// 	callback(null, true);
		// } else {
		// 	callback(new Error("Not a PDF file"), false);
		// }
	},
	limits: {
		fileSize: 1024 * 1024 * 1024 * 1024 * 2,
	},
});

// var uploads = multer({
// 	storage: Storage,
// 	fileFilter: function (req, files, callback) {
// 		if (files.mimetype == "image/png" || files.mimetype == "image/jpg") {
// 			callback(null, true);
// 		} else {
// 			console.log("only jpg & png files supported!");
// 			callback(null, false);
// 		}
// 	},
// 	limits: {
// 		fileSize: 1024 * 1024 * 1024 * 1024 * 1024 * 2,
// 	},
// });
module.exports = upload;
