const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("Topics API", () => {
	describe("Get Request", () => {
		test("GET: 200, should return all topics", () => {
			return request(app)
				.get("/api/topics")
				.expect(200)
				.then(({ body }) => {
					const { topics } = body;
					expect(topics).toBeInstanceOf(Array);
					topics.forEach((topic) => {
						expect(Object.keys(topic)).toEqual(["slug", "description"]);
					});
				});
		});
	});
});
// Implement tests later when more methods have been implemented
describe("Error Testing", () => {
	test("should be able to handle a get request when there are no topics", () => {});
	test("Get: 400:", () => {});
	test("Get: 404", () => {});
});
