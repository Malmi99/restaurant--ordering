# Restaurant Ordering System

## Overview
This project is a restaurant ordering system implemented using Node.js, MySQL, and Sequelize. It allows users to place orders, manage menu items, and generate advanced reports.

## Features
- User registration and login with JWT authentication
- Menu management with CRUD operations and file uploads
- Order placement and management
- Advanced reporting functionality
- Input validation and error handling

## Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure the database in `config/config.json`
4. Run migrations: `npx sequelize-cli db:migrate`
5. Seed the database: `node seeders/seed.js`
6. Start the server: `npm start`
7. Access API documentation at `/api-docs`

## Additional Information
- Uses JWT for authentication and authorization
- Implements advanced error handling and input validation with AJV
- Generates API documentation with Swagger
