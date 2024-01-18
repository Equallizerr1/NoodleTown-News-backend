const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const { getEndpoints } = require("./controllers/endpoints.controller");
const {
	getArticleById,
	getArticles,
} = require("./controllers/articles.controller");
const {
	customErrorHandler,
	internalServerError,
} = require("./errors/custom-errors");
const { sqlErrorHandler } = require("./errors/sql-errors");
const {
	getAllCommentsForArticle,
	postComment,
} = require("./controllers/comments.controller");

const app = express();

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getAllCommentsForArticle);

app.post("/api/articles/:article_id/comments", postComment);

app.use(customErrorHandler);

app.use(sqlErrorHandler);

app.use(internalServerError);

module.exports = app;
