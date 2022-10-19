const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const { createBook } = require("../controllers/book.controller");

router.post("/post-book", upload.single("file"), createBook);

module.exports = router;
