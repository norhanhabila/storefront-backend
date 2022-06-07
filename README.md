The project is a database for a storefront containing 4 main columns loaded in the migrations (products,users,orders,order_products )
it operates on port 5432
it uses express, node and sql to operate

Set up

- yarn -> to install all dependencies
- set up a database storefront for development and storefront_test for testing with the credintials at database.json

  type in powershell
  -CREATE USER postgres WITH PASSWORD 1234;
  -psql -U postgres and type the password 1234
  -CREATE DATABASE storefront;
  -CREATE DATABASE storefront_test;
  -GRANT ALL PRIVILEGES ON DATABASE storefront TO postgres;
  -GRANT ALL PRIVILEGES ON DATABASE storefront_test TO postgres;

- db-migrate up -> to set up the database and get access via localhost port 5432
- yarn run tsc -> to build the app
- add environment variables file (.env) with these parameters
  DB_NAME = storefront
  DB_HOST = localhost
  DB_PORT = 5432
  DB_USER = postgres
  DB_PASS = 1234
  ENV = test // or dev for development
  BCRYPT_PASSWORD = mypass
  SALT_ROUNDS = 10
  TOKEN_SECRET= nora
  DB_TEST_NAME= storefront_test

Start the app

- yarn run start -> to start the app and get access via http://127.0.0.1:3000

Test the app

- yarn run test -> to run all tests and clear the testing databse
