import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

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
