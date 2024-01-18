const { selectArticleById } = require("../models/articles.model");
const {
	selectAllCommentsForArticle,
	postComment,
} = require("../models/comments.model");

exports.getAllCommentsForArticle = (req, res, next) => {
	const { article_id } = req.params;
	selectArticleById(article_id)
		.then(() => {})
		.catch((err) => {
			next(err);
		})
		.then(() => {
			selectAllCommentsForArticle(article_id)
				.then((comments) => {
					res.send({ comments: comments });
				})
				.catch((err) => {
					next(err);
				});
		});
};

exports.insertComment = () => {
	const { article_id } = req.params;
	postComment(article_id)
		.then(() => {})
		.catch((err) => {
			next(err);
		});
};
