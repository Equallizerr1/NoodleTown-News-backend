const {
	selectArticleById,
	selectArticles,
	updateArticle,
} = require("../models/articles.model");

exports.getArticles = (req, res, next) => {
	const { topic } = req.query;
	selectArticles(topic)
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

exports.patchArticle = (req, res, next) => {
	const { article_id } = req.params;
	const reqBody = req.body;
	updateArticle(article_id, reqBody)
		.then((article) => {
			res.send({ article });
		})
		.catch((err) => {
			next(err);
		});
};
