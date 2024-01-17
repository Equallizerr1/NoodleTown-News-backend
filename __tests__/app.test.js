const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const endpoints = require("../endpoints.json");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("API Testing", () => {
	describe("Endpoints Endpoint", () => {
		test("endpoints.json can be read and formatting correct", () => {
			expect(endpoints).toBeInstanceOf(Object);
		});
		test("Get: 200, should return a list of endpoints from json file", () => {
			return request(app)
				.get("/api")
				.expect(200)
				.then(({ body }) => {
					const endpointList = body.endpoints;
					expect(endpointList).toEqual(endpoints);
					expect(endpointList).not.toBe(endpoints);
				});
		});
	});
	describe("Topics Endpoint", () => {
		test("Get: 200, should return all topics", () => {
			return request(app)
				.get("/api/topics")
				.expect(200)
				.then(({ body }) => {
					const { topics } = body;
					expect(topics).toBeInstanceOf(Array);
					expect(topics.length).not.toBeLessThan(1);
					topics.forEach((topic) => {
						expect(Object.keys(topic)).toEqual(["slug", "description"]);
					});
				});
		});
	});
	describe("Articles Endpoint", () => {
		test("Get: 200, should return an array of all articles", () => {
			return request(app)
				.get("/api/articles")
				.expect(200)
				.then(({ body }) => {
					const { articles } = body;
					console.log(articles);
					expect(articles).toBeInstanceOf(Array);
					expect(articles.length).not.toBeLessThan(1);
					expect(articles).toBeSortedBy("created_at", { descending: true });
					articles.forEach((article) => {
						expect(article).toHaveProperty("author");
						expect(article).toHaveProperty("title");
						expect(article).toHaveProperty("article_id");
						expect(article).toHaveProperty("topic");
						expect(article).toHaveProperty("created_at");
						expect(article).toHaveProperty("votes");
						expect(article).toHaveProperty("article_img_url");
						expect(article).toHaveProperty("comment_count");
						expect(article).not.toHaveProperty("body");
					});
				});
		});
		test("Get: 200, should return a single article", () => {
			return request(app)
				.get("/api/articles/3")
				.expect(200)
				.then(({ body }) => {
					const { article } = body;
					expect(article).toBeInstanceOf(Array);
					expect(article.length).not.toBeLessThan(1);
					article.forEach((article) => {
						expect(article.article_id).toBe(3);
						expect(article).toHaveProperty("author");
						expect(article).toHaveProperty("title");
						expect(article).toHaveProperty("article_id");
						expect(article).toHaveProperty("body");
						expect(article).toHaveProperty("topic");
						expect(article).toHaveProperty("created_at");
						expect(article).toHaveProperty("votes");
						expect(article).toHaveProperty("article_img_url");
					});
				});
		});
	});
});

describe("Error Testing", () => {
	describe("Endpoint errors", () => {
		test("Err: 404, Returns error 404 when given a valid but non existant article is", () => {
			return request(app)
				.get("/api/articles/200")
				.expect(404)
				.then((response) => {
					expect(response.body.msg).toBe("article does not exist");
				});
		});
	});
	describe("SQL errors", () => {
		test("Err: 400, should be able to handle a get request when there are no matches with valid url", () => {
			return request(app)
				.get("/api/articles/article")
				.expect(400)
				.then((response) => {
					expect(response.body.msg).toBe("Bad request");
				});
		});
	});
});
