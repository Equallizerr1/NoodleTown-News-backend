const { selectArticleById } = require("../models/articles.model");
const {
	selectAllCommentsForArticle,
	insertComment,
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

exports.postComment = () => {
	const { article_id } = req.params;
	insertComment(article_id)
		.then(() => {})
		.catch((err) => {
			next(err);
		});
};
