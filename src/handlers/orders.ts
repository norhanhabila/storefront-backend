import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Order, OrderStore } from "../models/order";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(parseInt(req.params.user_id));
    res.json(order);
  } catch (error) {
    console.log(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Omit<Order, "id"> = {
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      user_id: req.body.user_id,
      status: req.body.status,
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (error) {
    console.log(error);
  }
};

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("Missing authorization header");
    jwt.verify(authorization.split(" ")[1], process.env.TOKEN_SECRET as string);

    next();
  } catch (error) {
    res.status(401).json({ message: "Incorrect authorization token" });
  }
};

const ordersRoutes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get("/orders/:user_id", verifyAuthToken, show);
  app.post("/orders", verifyAuthToken, create);
  app.delete("/orders", verifyAuthToken, destroy);
};

export default ordersRoutes;
