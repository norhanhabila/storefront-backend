import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe(" Order Products Handler", () => {
  it("get all products", async () => {
    const response = await request.get("/order/products");
    expect(response.status).toBe(200);
  });
  it("should return the user", async () => {
    request.get("/order/products/" + "1").then((response) => {
      expect(response.status).toBe(200);
    });
  });
});
