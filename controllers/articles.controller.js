const {
	selectArticleById,
	selectArticles,
	selectAllCommentsForArticle,
} = require("../models/articles.model");

exports.getArticles = (req, res, next) => {
	selectArticles()
		.then((articles) => {
			res.send({ articles: articles });
		})
		.catch((err) => {
			next(err);
		});
};

exports.getArticleById = (req, res, next) => {
	const { article_id } = req.params;
	selectArticleById(article_id)
		.then((article) => {
			res.send({ article: article });
		})
		.catch((err) => {
			next(err);
		});
};
