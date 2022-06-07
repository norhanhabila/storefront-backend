"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order_ProductStore = void 0;
const database_1 = require("../database");
class Order_ProductStore {
    async index() {
        try {
            const conn = await database_1.Client.connect();
            const sql = "SELECT * FROM order_products";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get order_products. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM order_products WHERE id=($1)";
            const conn = await database_1.Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find order_products ${id}. Error: ${err}`);
        }
    }
    async create(O) {
        try {
            const sql = "INSERT INTO order_products (quantity, order_id ,product_id ) VALUES($1, $2, $3) RETURNING *";
            const conn = await database_1.Client.connect();
            const result = await conn.query(sql, [
                O.quantity,
                O.order_id,
                O.product_id,
            ]);
            const order_products = result.rows[0];
            conn.release();
            return order_products;
        }
        catch (err) {
            throw new Error(`Could not add new order product ${O.order_id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = "DELETE FROM order_products WHERE id=($1)";
            const conn = await database_1.Client.connect();
            const result = await conn.query(sql, [id]);
            const order_product = result.rows[0];
            conn.release();
            return order_product;
        }
        catch (err) {
            throw new Error(`Could not delete order_product ${id}. Error: ${err}`);
        }
    }
}
exports.Order_ProductStore = Order_ProductStore;
