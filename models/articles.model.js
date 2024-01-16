const db = require("../db/connection");

exports.selectArticles = () => {
	return db
		.query(
			"SELECT article_id, title, topic, author, created_at,votes, article_img_url FROM articles"
		)
		.then(({ rows }) => {
			console.log(rows);
			return rows;
		});
};

exports.selectArticleById = (article_id) => {
	return db
		.query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
		.then((response) => {
			const article = response.rows;
			if (!article.length) {
				return Promise.reject({
					status: 404,
					msg: "article does not exist",
				});
			}
			return article;
		});
};
