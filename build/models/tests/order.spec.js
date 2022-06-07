"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const user_1 = require("../user");
const product_1 = require("../product");
const store = new order_1.OrderStore();
describe("Order Model", () => {
    let createdProduct;
    let createdUser;
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it("should have a show method", () => {
        expect(store.show).toBeDefined();
    });
    it("should have a create method", () => {
        expect(store.create).toBeDefined();
    });
    it("shows the current order by user id", async () => {
        const pStore = new product_1.ProductStore();
        const uStore = new user_1.UserStore();
        const createdProduct = await pStore.create({
            name: "tshirt",
            price: 20,
            category: "clothing",
        });
        const createdUser = await uStore.create({
            firstName: "Norhan",
            lastName: "Habila",
            password: "123",
        });
        const createdOrder = await store.create({
            product_id: createdProduct.id,
            quantity: 2,
            user_id: createdUser.id,
            status: "active",
        });
        const result = await store.show(createdUser.id);
        expect(result).toEqual({
            id: result.id,
            product_id: createdProduct.id,
            quantity: 2,
            user_id: createdUser.id,
            status: "active",
        });
    });
});
