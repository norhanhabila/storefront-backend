"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = require("../database");
class ProductStore {
    async index() {
        try {
            const conn = await database_1.Client.connect();
            const sql = "SELECT * FROM products";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM products WHERE id=($1)";
            const conn = await database_1.Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    async create(P) {
        try {
            const sql = "INSERT INTO products (name, price ,category) VALUES($1, $2, $3) RETURNING *";
            const conn = await database_1.Client.connect();
            const result = await conn.query(sql, [P.name, P.price, P.category]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not add new product ${P.name}}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = "DELETE FROM products WHERE id=($1)";
            const conn = await database_1.Client.connect();
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
