# JSON Server Setup Guide

## Installation

1. Install JSON Server and JSON Server Auth globally:

```bash
npm install -g json-server json-server-auth
```

2. Create a db.json file:

```json
{
  "users": [],
  "products": [
    {
      "id": 1,
      "title": "Sample Product",
      "price": 299.99,
      "description": "Product description",
      "image": "sample-image-url",
      "brand": "Brand Name",
      "category": "Electronics",
      "discount": "10"
    }
  ],
  "orders": [],
  "carts": []
}
```

3. Create a routes.json file:

```json
{
  "users": 600,
  "products": 444,
  "orders": 660,
  "carts": 660
}
```

## Running the Server

Start the server with authentication:

```bash
json-server db.json --routes routes.json --middlewares ./node_modules/json-server-auth --port 3000
```

## API Endpoints

### Authentication

- POST /register - Register new user
- POST /signin - Login user

### Products

- GET /products - Get all products
- GET /products/:id - Get single product
- POST /products - Create product (protected)
- PUT /products/:id - Update product (protected)
- DELETE /products/:id - Delete product (protected)

### Orders

- GET /orders - Get user orders (protected)
- POST /orders - Create order (protected)
- PATCH /orders/:id - Update order status (protected)

### Cart

- GET /carts/:userId - Get user cart (protected)
- PUT /carts/:userId - Update cart (protected)
- POST /carts - Create new cart (protected)

## Example User Registration

```json
{
  "email": "test@example.com",
  "password": "password123",
  "username": "testuser",
  "gender": "male"
}
```

## Authentication Rules

- Public routes: GET /products, GET /products/:id
- Protected routes: All /orders/_, /carts/_, POST/PUT/DELETE /products/\*
- User routes: POST /register, POST /signin
