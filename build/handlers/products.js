"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const product_1 = require("../models/product");
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (error) {
        res.json(error);
    }
};
const show = async (req, res) => {
    try {
        const product = await store.show(parseInt(req.params.id));
        res.json(product);
    }
    catch (error) {
        res.json(error);
    }
};
const create = async (req, res) => {
    try {
        const product = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
const verifyAuthToken = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization)
            throw new Error("Missing authorization header");
        jsonwebtoken_1.default.verify(authorization.split(" ")[1], process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Incorrect authorization token" });
    }
};
const productRoutes = (app) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", verifyAuthToken, create);
    app.delete("/products", destroy);
};
exports.default = productRoutes;
