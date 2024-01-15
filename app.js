const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const { handleCustomError } = require("./errors/custom-errors");
const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);
app.use(handleCustomError);
module.exports = app;
