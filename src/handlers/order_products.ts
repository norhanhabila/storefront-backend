import express, { Request, Response } from "express";
import { Order_Product, Order_ProductStore } from "../models/order_product";

const store = new Order_ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const order_products = await store.index();
    res.json(order_products);
  } catch (error) {
    console.log(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order_product = await store.show(parseInt(req.params.id));
    res.json(order_product);
  } catch (error) {
    console.log(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order_product: Omit<Order_Product, "id"> = {
      quantity: req.body.quantity,
      order_id: req.body.order_id,
      product_id: req.body.product_id,
    };

    const newOrder_Product = await store.create(order_product);
    res.json(newOrder_Product);
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

const order_productsRoutes = (app: express.Application) => {
  app.get("/order/products", index);
  app.get("/order/products/:id", show);
  app.post("/order/products", create);
  app.delete("/order/products", destroy);
};

export default order_productsRoutes;
