const { selectArticleById } = require("../models/articles.model");

exports.getArticleById = (req, res, next) => {
	const { article_id } = req.params;
	console.log(article_id);
	selectArticleById(article_id)
		.then((article) => {
			res.send({ article });
		})
		.catch((err) => {
			// remove later
			console.log(err);
			next(err);
		});
};
