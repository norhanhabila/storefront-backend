"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT, DB_TEST_NAME, ENV } = process.env;
if (ENV === "test") {
    exports.Client = new pg_1.Pool({
        host: DB_HOST,
        database: DB_TEST_NAME,
        user: DB_USER,
        password: DB_PASS,
        port: parseInt(DB_PORT),
    });
}
else if (ENV === "dev") {
    exports.Client = new pg_1.Pool({
        host: DB_HOST,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASS,
        port: parseInt(DB_PORT),
    });
}
