"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe(" Product Handler", () => {
    it("should require authorization when adding a product ", () => {
        request
            .post("/products")
            .send({ name: "shoes", price: 10, category: "footwear" })
            .then((res) => {
            expect(res.status).toBe(401);
        });
    });
    it("get all products", async () => {
        request
            .get("/products")
            .then((response) => expect(response.status).toBe(200));
    });
    it("should return the user", async () => {
        request.get("/products/" + "1").then((response) => {
            expect(response.status).toBe(200);
        });
    });
});
