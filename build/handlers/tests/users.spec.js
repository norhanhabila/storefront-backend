"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe("User Handler", () => {
    const userData = {
        firstName: "Norhan",
        lastName: "Habila",
        password: "123",
    };
    let id;
    let token;
    beforeAll(async () => {
        const response = await request.post("/users").send(userData);
        id = response.body.id;
        token = response.body.token;
    });
    it("should add a user", async () => {
        request
            .post("/users")
            .send(userData)
            .then((res) => {
            const { status } = res;
            expect(status).toBe(200);
        });
    });
    it("should require authorization", () => {
        request.get("/users").then((res) => {
            expect(res.status).toBe(401);
        });
    });
    it("get all users", async () => {
        const response = await request
            .get("/users")
            .set("Authorization", `Bearer ${token.replace(/['"]+/g, "")}`);
        expect(response.status).toBe(200);
    });
    it("should return the user", async () => {
        request
            .get("/users/" + id)
            .set("Authorization", `Bearer ${token.replace(/['"]+/g, "")}`)
            .then((response) => {
            expect(response.status).toBe(200);
        });
    });
});
