import { Client } from "../database";
import bcrypt from "bcrypt";

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  password_digest: string;
  password: string;
};

export class UserStore {
  async index(): Promise<Omit<User, "password">[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Omit<User, "password">> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(
    U: Omit<User, "id" | "password_digest">
  ): Promise<Omit<User, "password">> {
    try {
      const sql =
        "INSERT INTO users (firstName , lastName ,password_digest) VALUES($1, $2, $3) RETURNING *";
      const conn = await Client.connect();
      const hash = bcrypt.hashSync(
        U.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );

      const result = await conn.query(sql, [U.firstName, U.lastName, hash]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${U.firstName}}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Omit<User, "password">> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
  async authenticate(
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User | null> {
    try {
      const sql = "SELECT * FROM users WHERE firstName=($1)";
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [firstName, lastName]);

      if (rows.length > 0) {
        const user = rows[0];

        if (
          bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password_digest)
        ) {
          return user;
        }
      }

      connection.release();

      return null;
    } catch (err) {
      throw new Error(`Could not find user ${firstName},${lastName}. ${err}`);
    }
  }
}
