# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index "/products" [GET]
- Show "/products/:id" [GET]
- Create [token required] "/products" [POST]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required] "/users" [GET]
- Show [token required] "/users/:id" [GET]
- Create N[token created] "/users" [POST]

#### Orders

- Current Order by user (args: user id)[token required] "/orders/:user_id" [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

#### Order_products

- Index [token required] "/order/products" [GET]
- Show [token required] "/order/products/:id" [GET]
- Create N[token created] "/order/products" [POST]
- Destroy "/order/products" [Delete]

## Data Shapes

#### Product

- id [primary serial key]
- name [string not null]
- price [number]
- [OPTIONAL] category [string]

#### User

- id [primary serial key]
- firstName [string not null]
- lastName [string not null]
- password [string not null]

#### Orders

- id [primary serial key]
- id of each product in the order [Integer foreign key]
- quantity of each product in the order [INTEGER DEFAULT 1]
- user_id [Integer foreign key]
- status of order (active or complete) [type mood {active or complete} not null]

#### Order_products

- id [integer not null]
- quantity [integer]
- order_id [bigint foreign key]
- product_id [bigint foreign key]
