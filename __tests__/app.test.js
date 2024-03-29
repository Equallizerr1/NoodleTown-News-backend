const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const endpoints = require("../endpoints.json");

//beforeEach(() => seed(data));
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
					const topics = body.topics;
					expect(topics).toBeInstanceOf(Array);
					expect(topics.length).not.toBeLessThan(1);
					topics.forEach((topic) => {
						expect(Object.keys(topic)).toEqual(["slug", "description"]);
					});
				});
		});
	});
	describe("Articles Endpoint", () => {
		describe("Get articles", () => {
			test("Get: 200, should return an array of all articles sorted by date", () => {
				return request(app)
					.get("/api/articles")
					.expect(200)
					.then(({ body }) => {
						const articles = body.articles;
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
		});
		describe("Get article by id", () => {
			test("Get: 200, should return a single article", () => {
				return request(app)
					.get("/api/articles/3")
					.expect(200)
					.then(({ body }) => {
						const article = body.article;
						console.log(article);
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
							expect(article).toHaveProperty("comment_count");
						});
					});
			});
			test("Err: 404, Returns error 404 when given a valid but non existant article id", () => {
				return request(app)
					.get("/api/articles/200")
					.expect(404)
					.then((response) => {
						expect(response.body.msg).toBe("article does not exist");
					});
			});
			test("Err: 400, should be able to handle a get request when there are no matches with invalid url", () => {
				return request(app)
					.get("/api/articles/article")
					.expect(400)
					.then((response) => {
						expect(response.body.msg).toBe("Bad request");
					});
			});
		});
		describe("Patch article", () => {
			test("Patch: 200, Return updated article", () => {
				const newVote = -15;
				return request(app)
					.patch("/api/articles/1")
					.send({ inc_votes: newVote })
					.expect(200)
					.then(({ body }) => {
						expect(body.article.article_id).toBe(1);
						expect(body.article.votes).toBe(85);
						expect(body.article).toHaveProperty("author");
						expect(body.article).toHaveProperty("title");
						expect(body.article).toHaveProperty("article_id");
						expect(body.article).toHaveProperty("body");
						expect(body.article).toHaveProperty("topic");
						expect(body.article).toHaveProperty("created_at");
						expect(body.article).toHaveProperty("article_img_url");
					});
			});
			test("Err: 404, Returns error 404 when given a valid but non existant article id", () => {
				const newVote = -15;
				return request(app)
					.patch("/api/articles/9999999")
					.send({ inc_votes: newVote })
					.expect(404)
					.then((response) => {
						expect(response.body.msg).toBe("article does not exist");
					});
			});
			test("Err: 400, should be able to handle a get request when there are no matches with invalid url", () => {
				const newVote = "two";
				return request(app)
					.patch("/api/articles/article")
					.send({ inc_votes: newVote })
					.expect(400)
					.then((response) => {
						expect(response.body.msg).toBe("Bad request");
					});
			});
			test("Err: 400, Return error 400 if not provided with a inc_votes key", () => {
				return request(app)
					.patch("/api/articles/2/")
					.send({
						body: "hello world",
					})
					.expect(400)
					.then((response) => {
						expect(response.body.msg).toBe("Bad request");
					});
			});
		});
		describe("Topic Query", () => {
			test("should return all articles by given topic query", () => {
				return request(app)
					.get("/api/articles?topic=mitch")
					.expect(200)
					.then(({ body }) => {
						console.log(body);
						expect(body.articles).toHaveLength(12);
						body.articles.forEach((topic) => {
							expect(topic.topic).toBe("mitch");
							expect(topic).toHaveProperty("author");
							expect(topic).toHaveProperty("title");
							expect(topic).toHaveProperty("article_id");
							expect(topic).toHaveProperty("topic");
							expect(topic).toHaveProperty("created_at");
							expect(topic).toHaveProperty("votes");
							expect(topic).toHaveProperty("article_img_url");
							expect(topic).toHaveProperty("comment_count");
							expect(topic).not.toHaveProperty("body");
						});
					});
			});
			test("GET:404, Returns error 404 when given a valid but non existant topic query", () => {
				return request(app)
					.get("/api/articles?topic=umbrella")
					.expect(404)
					.then(({ body }) => {
						expect(body.msg).toBe("no articles found");
					});
			});
		});
	});
	describe("Comments Endpoint", () => {
		describe("Get comment for article", () => {
			test("Get: 200,  should return an empty if no comments, or an array of comments for an article", () => {
				return request(app)
					.get("/api/articles/2/comments")
					.expect(200)
					.then(({ body }) => {
						const comments = body.comments;
						expect(comments).toBeInstanceOf(Array);
						expect(comments).toBeSortedBy("created_at", { descending: true });
						comments.forEach((comment) => {
							expect(comment.article_id).toBe(3);
							expect(comment).toHaveProperty("comment_id");
							expect(comment).toHaveProperty("votes");
							expect(comment).toHaveProperty("created_at");
							expect(comment).toHaveProperty("author");
							expect(comment).toHaveProperty("body");
							expect(comment).toHaveProperty("article_id");
						});
					});
			});
			test("Err: 404, Returns error 404 when given a valid but non existant article id", () => {
				return request(app)
					.get("/api/articles/20000/comments")
					.expect(404)
					.then((response) => {
						expect(response.body.msg).toBe("article does not exist");
					});
			});
			test("Err: 400, should be able to handle a get request when there are no matches with valid url", () => {
				return request(app)
					.get("/api/articles/article/comments")
					.expect(400)
					.then((response) => {
						expect(response.body.msg).toBe("Bad request");
					});
			});
		});
		describe("Post comment to article", () => {
			test("Post: 201, should post a comment into comments", () => {
				return request(app)
					.post("/api/articles/1/comments")
					.send({
						username: "butter_bridge",
						body: "hello world",
					})
					.expect(201)
					.then(({ body }) => {
						expect(body.author).toBe("butter_bridge");
						expect(body.body).toBe("hello world");
					});
			});
			test("Err: 404, Returns error 404 when given a valid but non existant article id", () => {
				return request(app)
					.post("/api/articles/20000/comments")
					.send({
						username: "butter_bridge",
						body: "hello world",
					})
					.expect(404)
					.then((response) => {
						expect(response.body.msg).toBe("article does not exist");
					});
			});
			test("Err: 400, Return error 400 if not provided with a username key", () => {
				return request(app)
					.post("/api/articles/2/comments")
					.send({
						body: "hello world",
					})
					.expect(400)
					.then((response) => {
						expect(response.body.msg).toBe("Bad request");
					});
			});
			test("Err: 400, Return error 400 if not provided a body key", () => {
				return request(app)
					.post("/api/articles/2/comments")
					.send({
						username: "butter_bridge",
					})
					.expect(400)
					.then((response) => {
						expect(response.body.msg).toBe("Bad request");
					});
			});
			test("Err: 404, Return error 404 if provided with a username key that is not in the DB", () => {
				return request(app)
					.post("/api/articles/2/comments")
					.send({
						username: "sam",
						body: "hello world",
					})
					.expect(404)
					.then((response) => {
						expect(response.body.msg).toBe("user does not exist");
					});
			});
		});
		describe("Delete comment by id", () => {
			test("Delete: 204, should be able to delete a comment by it's id", () => {
				return request(app).delete("/api/comments/1").expect(204);
			});
			test("Delete: 404, responds with an appropriate status and error message when given a non-existent id", () => {
				return request(app)
					.delete("/api/comments/1000")
					.expect(404)
					.then((response) => {
						expect(response.body.msg).toBe("comment does not exist");
					});
			});
			test("Delete: 400, responds with an appropriate status and error message when given an invalid id", () => {
				return request(app)
					.delete("/api/comments/not-a-comment")
					.expect(400)
					.then((response) => {
						expect(response.body.msg).toBe("Bad request");
					});
			});
		});
	});
	describe("Users Endpoint", () => {
		describe("Get Users", () => {
			test("Get: 200, Returns and array of users", () => {
				return request(app)
					.get("/api/users")
					.expect(200)
					.then(({ body }) => {
						const users = body.users;
						expect(users).toBeInstanceOf(Array);
						expect(users.length).not.toBeLessThan(1);
						users.forEach((user) => {
							expect(Object.keys(user)).toEqual([
								"username",
								"name",
								"avatar_url",
							]);
						});
					});
			});
		});
		describe("Get user by username", () => {
			test("Get: 200, should return a single username", () => {
				return request(app)
					.get("/api/users/lurker")
					.expect(200)
					.then(({ body }) => {
						const user = body;
						expect(user).toBeInstanceOf(Array);
						expect(user.length).not.toBeLessThan(1);
						user.forEach((user) => {
							expect(user).toHaveProperty("username");
							expect(user).toHaveProperty("name");
							expect(user).toHaveProperty("avatar_url");
						});
					});
			});
			test("Err: 404, Returns error 404 when given a valid but non existant user id", () => {
				return request(app)
					.get("/api/users/sam")
					.expect(404)
					.then((response) => {
						expect(response.body.msg).toBe("user does not exist");
					});
			});
		});
	});
});
