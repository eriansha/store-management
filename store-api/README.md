# Store API

REST API for store-web

## Features
- User authentication (JWT)
- View transaction info (e.g today income, monthly income)
- Managing store (get stores, create new stores)

## Database Design
<img width="400" alt="image" src="https://github.com/user-attachments/assets/094d56da-60eb-4006-828b-d860afea76d5">

- `users` table stores user information for the login process and related data.
- `merchants` table refers to the entity or business that owns or operates one or more stores. The merchant represents the broader business entity
- `stores` table represents stores information, individual locations or outlets under that merchant's control.

## Tech Stack
- 🐨 Golang v1.22.3
- 📋 MySQL
- 🦍 Gorilla Mux v3.2, implements a request router and dispatcher for matching incoming requests to their respective handler.
- 🔒 Golang Crypto, to implement password hashing
- 🔑 Golang JWT

## Prerequisites
Before you begin, ensure you have the following installed:

- Go 1.x.x or later
- MySQL Database

## Installation
1. Clone the repository:
```
git clone https://github.com/eriansha/store-management
cd store-api
```

2. Create new database via mysql cli. You can use any name 
```sql
> create database store_management;
```

3. Import `store_management.sql` script to the database
```
mysql -u root -p <your-database-name> < store_management.sql
```

4. Install dependencies:
```
go mod download
```

5. Set up environment variables. Create a .env file in the root of your project:
```
JWT_SECRET_KEY=<your-secret-key>
CORS_DEBUG=false
DB_DRIVER=mysql
DB_USER=<db-user>
DB_PASS=<db-pass>
DB_NAME=<db-name>
```

To fill `JWT_SECRET_KEY`, you need to create a strong, random string that will be used to sign and verify your tokens. Here's one method to use `openssl`
```
openssl rand -base64 64
/i0X0EzZEuWvuEfuSaTJkeD2o6b2mBqfk+84etr3foNCPWidJTBJZsb6QaugoyNC
ajj4e+5CAAjw6EvuLtx18g==
```

## Usage
To start the server, run:
```
go run main.go
```
By default, the server will run on http://localhost:8090.

Use available dummy user credential
```
email: john.doe@example.com
password: password12345
```

## API Endpoints
- POST /api/login: Login to get access token
- GET /api/transaction-info: Fetch transaction info (dummy data).
- GET /api/stores?search=: Fetch multiple stores and filtering by `store.official_company_name`
- POST /api/stores: Create a new stores
