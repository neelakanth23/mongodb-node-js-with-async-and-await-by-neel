const bookDetails = require("../models/book.model");
const Book = require("../models/book.model");
const fs = require("fs");
const path = require("path");
const pdfparse = require("pdf-parse");

const createBook = async (req, res) => {
	console.log(req.file);

	const pdffile = fs.readFileSync(
		path.resolve(__dirname, `../middleware/uploads/${req.file.filename}`)
	);
	pdfparse(pdffile).then(async (data) => {
		console.log(data.numpages);
		const book = {
			title: req.file.filename,
			textContent: data.text,
		};

		const bookData = await bookDetails.create(book);
		console.log(bookData);
		res.status(201)
			.json({
				message: "Book uploaded successfully",
				uploadedBook: {
					name: bookData.title,
					text: bookData.textContent,
					_id: bookData._id,
				},
			})
			.catch((e) => {
				// console.log(e)
				res.status(500).json({
					error: e,
				});
			});
	});
};

module.exports = { createBook };
