import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
const { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT, DB_TEST_NAME, ENV } =
  process.env;
export let Client: Pool;
if (ENV === "test") {
  Client = new Pool({
    host: DB_HOST,
    database: DB_TEST_NAME,
    user: DB_USER,
    password: DB_PASS,
    port: parseInt(DB_PORT as string),
  });
} else if (ENV === "dev") {
  Client = new Pool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASS,
    port: parseInt(DB_PORT as string),
  });
}
