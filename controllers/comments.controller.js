const { selectArticleById } = require("../models/articles.model");
const {
	selectAllCommentsForArticle,
	removeCommentById,
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

exports.deleteCommentById = (req, res, next) => {
	const { comment_id } = req.params;
	removeCommentById(comment_id)
		.then(() => {
			res.status(204).send();
		})
		.catch((err) => {
			next(err);
		});
};
