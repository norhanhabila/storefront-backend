"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = require("../database");
class OrderStore {
    async index() {
        try {
            const conn = await database_1.Client.connect();
            const sql = "SELECT * FROM orders";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }
    async show(user_id) {
        try {
            const sql = "SELECT * FROM orders WHERE user_id=($1)";
            const conn = await database_1.Client.connect();
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find order for this user ${user_id}. Error: ${err}`);
        }
    }
    async create(O) {
        try {
            const sql = "INSERT INTO orders (product_id, quantity ,user_id ,status) VALUES($1, $2, $3, $4) RETURNING *";
            const conn = await database_1.Client.connect();
            const result = await conn.query(sql, [
                O.product_id,
                O.quantity,
                O.user_id,
                O.status,
            ]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add new order ${O.product_id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = "DELETE FROM orders WHERE id=($1)";
            const conn = await database_1.Client.connect();
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
