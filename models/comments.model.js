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

exports.insertComment = (article_id) => {
	return db.query().then(() => {
		return;
	});
};
