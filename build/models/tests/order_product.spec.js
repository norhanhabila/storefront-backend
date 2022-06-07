"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_product_1 = require("../order_product");
const product_1 = require("../product");
const user_1 = require("../user");
const order_1 = require("../order");
const store = new order_product_1.Order_ProductStore();
describe("Order_product Model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it("should have a show method", () => {
        expect(store.show).toBeDefined();
    });
    it("should have a create method", () => {
        expect(store.create).toBeDefined();
    });
    it("create method should add an order", async () => {
        const pStore = new product_1.ProductStore();
        const oStore = new order_1.OrderStore();
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
        const createdOrder = await oStore.create({
            product_id: createdProduct.id,
            quantity: 2,
            user_id: createdUser.id,
            status: "active",
        });
        const result = await store.create({
            quantity: 1,
            order_id: createdOrder.id,
            product_id: createdProduct.id,
        });
        expect(result).toEqual({
            id: result.id,
            quantity: 1,
            order_id: `${createdOrder.id}`,
            product_id: `${createdProduct.id}`,
        });
    });
    it("reads the items in the table", async () => {
        const result = await store.index();
        expect(result).toBeDefined;
    });
});
