const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const endpoints = require("../endpoints.json");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("API Testing", () => {
	describe.skip("Topics Endpoint", () => {
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
	describe.skip("Endpoints Endpoint", () => {
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
	describe("Articles Endpoint", () => {
		test("Get: 200, should return a single article", () => {
			return request(app).get("/api/articles/1").expect(200);
		});
	});
});
// Implement tests later when more methods have been implemented
describe("Error Testing", () => {
	describe("Endpoint errors", () => {
		test("Get: 404, Returns error 404 when given an invalid url", () => {
			return request(app).get("/api/topic").expect(404).then((response) => {
				console.log(response.body);
			})
		});
		//test("GET: 400", () => {});
		//test("should be able to handle a get request when there are no matches with valid url", () => {});
	});
});
