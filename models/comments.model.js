const db = require("../db/connection");

exports.selectAllCommentsForArticle = (article_id) => {
	return db
		.query(
			"SELECT * FROM comments WHERE comments.article_id = $1 ORDER BY created_at DESC;",
			[article_id]
		)
		.then((result) => {
			return result.rows;
		});
};


exports.removeCommentById = (comment_id) => {
	return db
		.query("DELETE FROM comments WHERE comment_id = $1;", [comment_id])
		.then((result) => {
			if (!result.rowCount) {
				return Promise.reject({
					status: 404,
					msg: "comment does not exist",
				});
			}
			return result.rows;
=======
exports.insertComment = (body, article_id, username) => {
	if (body === undefined || username === undefined)
		return Promise.reject({ status: 400, msg: "Bad request" });
	return db
		.query(
			"INSERT INTO comments (body, article_id, author) VALUES ($1, $2, $3) RETURNING*;",
			[body, article_id, username]
		)
		.then((result) => {
			return result.rows[0];

		});
};
