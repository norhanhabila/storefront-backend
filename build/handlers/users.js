"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const store = new user_1.UserStore();
const index = async (_req, res) => {
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
    const user = await store.show(Number(req.params.id));
    res.json(user);
};
const create = async (req, res) => {
    const user = req.body;
    try {
        const newUser = await store.create(user);
        var token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json({
            ...newUser,
            token,
        });
    }
    catch (err) {
        res.status(400);
        res.json(err + user);
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
        //res.send("token couldn't be verified!!");
        res.status(401).json({ message: "Incorrect authorization token" });
    }
};
const usersRoutes = (app) => {
    app.get("/users", verifyAuthToken, index);
    app.get("/users/:id", verifyAuthToken, show);
    app.post("/users", create);
    app.delete("/users", verifyAuthToken, destroy);
};
exports.default = usersRoutes;
