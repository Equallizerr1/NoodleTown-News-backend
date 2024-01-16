const { response } = require("../app");
const db = require("../db/connection");

exports.selectArticles = () => {
	return db
		.query(
			"SELECT article_id, title, topic, author, created_at,votes, article_img_url, CAST((SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id)AS INT) AS comment_count FROM articles ORDER BY created_at DESC"
		)
		.then(({ rows }) => {
			if (!rows.length) {
				return Promise.reject({
					status: 404,
					msg: "no articles found",
				});
			}
			return rows;
		});
};

exports.selectArticleById = (article_id) => {
	return db
		.query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
		.then(({ rows }) => {
			if (!rows.length) {
				return Promise.reject({
					status: 404,
					msg: "article does not exist",
				});
			}
			return rows;
		});
};
