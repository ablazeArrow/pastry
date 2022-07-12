# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index  route: 'products'     [GET]
- Show   route: 'products/:id' [GET]
- Create route: 'products'     [POST] protected
- 


#### Users
- Index  route: 'users'     [GET]  protected
- Show   route: 'users/:id' [GET]  protected 
- Create route: 'users'     [POST] protected
- authenticate route '/users/auth' [POST]

#### Orders
- Index  route: '/orders'     [GET]
- Show   route: '/orders/:id' [GET]
- Create route: '/orders'     [POST] protected
- Current Order route: '/users/:id/active-order' [GET] protected
- add products to order route: '/orders/:id/products' [POST]

### Database schema
#### Tables
- users
- products
- orders
- prchases

### Data Shapes

#### User
- id: number
- username: VARCHAR(64)
- firstname: VARCHAR(32)
- lastname: VARCHAR(48)
- password: VARCHAR(255

#### Product
- id:  number
- name: VARCHAR(128)
- price: money

#### Orders
- id: number
- user_id: number (foreign key to users table)
- order_status: VARCHAR(32)

#### Purchases
- order_id: number   (foreign key to orders table)
- product_id: number (foreign key to products table)
- quantity: number

