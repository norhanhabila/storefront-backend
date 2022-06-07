"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_product_1 = require("../models/order_product");
const store = new order_product_1.Order_ProductStore();
const index = async (_req, res) => {
    try {
        const order_products = await store.index();
        res.json(order_products);
    }
    catch (error) {
        console.log(error);
    }
};
const show = async (req, res) => {
    try {
        const order_product = await store.show(parseInt(req.params.id));
        res.json(order_product);
    }
    catch (error) {
        console.log(error);
    }
};
const create = async (req, res) => {
    try {
        const order_product = {
            quantity: req.body.quantity,
            order_id: req.body.order_id,
            product_id: req.body.product_id,
        };
        const newOrder_Product = await store.create(order_product);
        res.json(newOrder_Product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const deleted = await store.delete(req.params.id);
        res.json(deleted);
    }
    catch (error) {
        console.log(error);
    }
};
const order_productsRoutes = (app) => {
    app.get("/order/products", index);
    app.get("/order/products/:id", show);
    app.post("/order/products", create);
    app.delete("/order/products", destroy);
};
exports.default = order_productsRoutes;
