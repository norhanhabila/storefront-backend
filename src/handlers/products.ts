import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
  } catch (error) {
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
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

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
  app.delete("/products", destroy);
};

export default productRoutes;
