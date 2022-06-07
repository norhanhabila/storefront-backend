import { Client } from "../database";

export type Order_Product = {
  id: Number;
  quantity: Number;
  order_id: Number | string;
  product_id: Number | string;
};

export class Order_ProductStore {
  async index(): Promise<Order_Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM order_products";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get order_products. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order_Product> {
    try {
      const sql = "SELECT * FROM order_products WHERE id=($1)";
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order_products ${id}. Error: ${err}`);
    }
  }

  async create(O: Omit<Order_Product, "id">): Promise<Order_Product> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id ,product_id ) VALUES($1, $2, $3) RETURNING *";
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        O.quantity,
        O.order_id,
        O.product_id,
      ]);

      const order_products = result.rows[0];

      conn.release();

      return order_products;
    } catch (err) {
      throw new Error(
        `Could not add new order product ${O.order_id}. Error: ${err}`
      );
    }
  }

  async delete(id: string): Promise<Order_Product> {
    try {
      const sql = "DELETE FROM order_products WHERE id=($1)";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const order_product = result.rows[0];

      conn.release();

      return order_product;
    } catch (err) {
      throw new Error(`Could not delete order_product ${id}. Error: ${err}`);
    }
  }
}
