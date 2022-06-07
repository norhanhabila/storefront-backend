import productRoutes from "./handlers/products";
import userRoutes from "./handlers/users";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import ordersRoutes from "./handlers/orders";
import order_productsRoutes from "./handlers/order_products";
import cors from "cors";
const app: express.Application = express();
const address: string = "0.0.0.0:3000";
app.use(cors());
app.use(bodyParser.json());
ordersRoutes(app);
userRoutes(app);
productRoutes(app);
order_productsRoutes(app);
app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
