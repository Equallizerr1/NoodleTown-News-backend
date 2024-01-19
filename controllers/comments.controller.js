const { selectArticleById } = require("../models/articles.model");
const {
	selectAllCommentsForArticle,
	removeCommentById,
	insertComment,
} = require("../models/comments.model");
const { selectUserUsername } = require("../models/users.model");

exports.getAllCommentsForArticle = (req, res, next) => {
	const { article_id } = req.params;
	selectArticleById(article_id)
		.then(() => {
			selectAllCommentsForArticle(article_id).then((comments) => {
				res.send({ comments: comments });
			});
		})
		.catch((err) => {
			next(err);
		});
};

exports.postComment = (req, res, next) => {
	const { article_id } = req.params;
	const { body, username } = req.body;
	selectArticleById(article_id)
		.then(() => {
			return insertComment(body, article_id, username);
		})
		.then((comment) => {
			res.status(201).send(comment);
		})
		.catch((err) => {
			next(err);
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
