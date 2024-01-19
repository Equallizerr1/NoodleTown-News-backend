const db = require("../db/connection");

exports.selectArticles = (topic) => {
	const queryValues = [];
	let queryStr = `
	SELECT article_id, title, topic, author, created_at,votes, article_img_url, CAST((SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id)AS INT) AS comment_count FROM articles
	`;
	if (topic) {
		queryStr += ` WHERE topic = $1`;
		queryValues.push(topic);
	} else if (topic !== undefined) {
		return Promise.reject({
			status: 400,
			msg: "bad request",
		});
	}
	queryStr += ` ORDER BY created_at DESC;`;
	return db.query(queryStr, queryValues).then(({ rows }) => {
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

exports.updateArticle = (article_id, reqBody) => {
	if (!reqBody.inc_votes)
		return Promise.reject({ status: 400, msg: "Bad request" });
	return db
		.query(
			`UPDATE articles SET votes = votes + $2 
			WHERE article_id = $1
			RETURNING*`,
			[article_id, reqBody.inc_votes]
		)
		.then(({ rows }) => {
			if (!rows.length) {
				return Promise.reject({
					status: 404,
					msg: "article does not exist",
				});
			}
			return rows[0];
		});
};
