import express, { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User, UserStore } from "../models/user";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();

  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(Number(req.params.id));
  res.json(user);
};
const create = async (req: Request, res: Response) => {
  const user: Omit<User, "id" | "password_digest"> = req.body;
  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);

    res.json({
      ...newUser,
      token,
    });
  } catch (err) {
    res.status(400);
    res.json((err as string) + user);
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
    //res.send("token couldn't be verified!!");
    res.status(401).json({ message: "Incorrect authorization token" });
  }
};

const usersRoutes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
  app.delete("/users", verifyAuthToken, destroy);
};

export default usersRoutes;
