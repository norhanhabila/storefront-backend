"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
const index = async (_req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (error) {
        console.log(error);
    }
};
const show = async (req, res) => {
    try {
        const order = await store.show(parseInt(req.params.user_id));
        res.json(order);
    }
    catch (error) {
        console.log(error);
    }
};
const create = async (req, res) => {
    try {
        const order = {
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            user_id: req.body.user_id,
            status: req.body.status,
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
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
const ordersRoutes = (app) => {
    app.get("/orders", verifyAuthToken, index);
    app.get("/orders/:user_id", verifyAuthToken, show);
    app.post("/orders", verifyAuthToken, create);
    app.delete("/orders", verifyAuthToken, destroy);
};
exports.default = ordersRoutes;
