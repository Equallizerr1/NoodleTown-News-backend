const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const { getEndpoints } = require("./controllers/endpoints.controller");
const {
	getArticleById,
	getArticles,
} = require("./controllers/articles.controller");

const {
	getAllCommentsForArticle,
	deleteCommentById,
	postComment,
} = require("./controllers/comments.controller");

const { getUsers, getUserUsername } = require("./controllers/users.controller");

const {
	customErrorHandler,
	sqlErrorHandler,
	internalServerError,
} = require("./errors/errors");


const app = express();
app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getAllCommentsForArticle);
app.patch("/api/articles/:article_id")

app.post("/api/articles/:article_id/comments", postComment);


app.delete("/api/comments/:comment_id", deleteCommentById);

app.get("/api/users", getUsers);
app.get("/api/users/:username", getUserUsername);


app.use(customErrorHandler);
app.use(sqlErrorHandler);
app.use(internalServerError);

module.exports = app;
