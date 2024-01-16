const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const { handleCustomError } = require("./errors/custom-errors");
const { getEndpoints } = require("./controllers/endpoints.controller");
const { getArticleById } = require("./controllers/articles.controller");
const app = express();

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

// get article by id - parametric
app.get("/api/articles/:article_id", getArticleById);

app.use(handleCustomError);

module.exports = app;
