import supertest from "supertest";
import app from "../../server";
import { User } from "../../models/user";
import { Response } from "express";

const request = supertest(app);

describe("User Handler", () => {
  const userData: Omit<User, "id" | "password_digest"> = {
    firstName: "Norhan",
    lastName: "Habila",
    password: "123",
  };
  let id: number;
  let token: string;
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
