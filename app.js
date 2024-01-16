const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const { handleCustomError } = require("./errors/custom-errors");
const { getEndpoints } = require("./controllers/endpoints.controller");
const app = express();

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.use(handleCustomError);

module.exports = app;
