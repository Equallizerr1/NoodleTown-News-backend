const { selectArticleById } = require("../models/articles.model");

exports.getArticleById = (req, res, next) => {
    const { articleId } = req.query;
    console.log(articleId);
	selectArticleById();
};
