"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = require("../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class UserStore {
    async index() {
        try {
            const conn = await database_1.Client.connect();
            const sql = "SELECT * FROM users";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM users WHERE id=($1)";
            const conn = await database_1.Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async create(U) {
        try {
            const sql = "INSERT INTO users (firstName , lastName ,password_digest) VALUES($1, $2, $3) RETURNING *";
            const conn = await database_1.Client.connect();
            const hash = bcrypt_1.default.hashSync(U.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
            const result = await conn.query(sql, [U.firstName, U.lastName, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add new user ${U.firstName}}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = "DELETE FROM users WHERE id=($1)";
            const conn = await database_1.Client.connect();
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }
    async authenticate(firstName, lastName, password) {
        try {
            const sql = "SELECT * FROM users WHERE firstName=($1)";
            const connection = await database_1.Client.connect();
            const { rows } = await connection.query(sql, [firstName, lastName]);
            if (rows.length > 0) {
                const user = rows[0];
                if (bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, user.password_digest)) {
                    return user;
                }
            }
            connection.release();
            return null;
        }
        catch (err) {
            throw new Error(`Could not find user ${firstName},${lastName}. ${err}`);
        }
    }
}
exports.UserStore = UserStore;
