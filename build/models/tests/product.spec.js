"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const store = new product_1.ProductStore();
describe("Product Model", () => {
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
        const result = await store.create({
            name: "tshirt",
            price: 20,
            category: "clothing",
        });
        expect(result).toEqual({
            id: result.id,
            name: "tshirt",
            price: "20",
            category: "clothing",
        });
    });
    it("reads the items in the table", async () => {
        const result = await store.index();
        expect(result).toBeDefined;
    });
    it("shows an item in the table by id", async () => {
        const newproduct = await store.create({
            name: "tshirt",
            price: 20,
            category: "clothing",
        });
        const result = await store.show(newproduct.id);
        expect(result).toEqual({
            id: newproduct.id,
            name: "tshirt",
            price: "20",
            category: "clothing",
        });
    });
});
