const { selectArticleById } = require("../models/articles.model");
const {
	selectAllCommentsForArticle,
	insertComment,
} = require("../models/comments.model");

exports.getAllCommentsForArticle = (req, res, next) => {
	const { article_id } = req.params;
	selectArticleById(article_id)
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
	//const { username, body } = req.body;
	console.log(article_id);
	selectArticleById(article_id)
		.catch((err) => {
			next(err);
		});
	// .then(() => {
	// 	insertComment(username, body)
	// 		.then((comment) => {
	// 			res.status(201).send({ comment });
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			next(err);
	// 		});
	// });
};
