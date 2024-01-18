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

// exports.insertComment = ({ body, username }) => {
// 	return db
// 		.query("INSERT INTO comments (body, author) VALUES ($1, $2) RETURNING*;", [
// 			body,
// 			username,
// 		])
// 		.then((result) => {
// 			return result.rows;
// 		});
// };
