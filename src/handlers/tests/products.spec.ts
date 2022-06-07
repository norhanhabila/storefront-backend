import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

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
