"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe(" Order Handler", () => {
    it("should add a order", async () => {
        const response = await request.post("/orders").send({
            status: "complete",
            user_id: 1,
        });
        expect(response.status).toBe(401);
    });
    it("should return a list of orders", async () => {
        const response = await request.get("/orders");
        expect(response.status).toBe(401);
    });
});
