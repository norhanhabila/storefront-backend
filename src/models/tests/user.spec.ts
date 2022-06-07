import { User, UserStore } from "../user";
import bcrypt from "bcrypt";

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const hash = bcrypt.hashSync(
  "123" + BCRYPT_PASSWORD,
  parseInt(SALT_ROUNDS as string)
);
const store = new UserStore();
async () => {
  const result = await store.create({
    firstName: "Norhan",
    lastName: "Habila",
    password: "123",
  });

  describe("User Model", () => {
    it("should have an index method", () => {
      expect(store.index).toBeDefined();
    });
    it("should have a show method", () => {
      expect(store.show).toBeDefined();
    });

    it("should have a create method", () => {
      expect(store.create).toBeDefined();
    });

    it("create method should add a user", async () => {
      expect(result.firstName).toEqual("Norhan");
    });

    it("reads the items in the table", async () => {
      const output = await store.index();
      expect(output).not.toBeNull();
    });
    it("shows an item in the table by id", async () => {
      const output = await store.show(1);
      expect(output).not.toBeNull();
    });

    it("authenticate user with password", async () => {
      const output = await store.authenticate("Norhan", "Habila", "123");
      expect(output).not.toBeNull;
    });
  });
};
