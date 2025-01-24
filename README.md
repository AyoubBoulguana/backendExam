Getting Started
Prerequisites
Before you begin, ensure you have the following installed on your machine:

Node.js (v14 or later)
npm (Node package manager)
PostgreSQL (if you're running a local instance)
Installation
Run the following command to install the necessary dependencies:

Copier
npm install
Environment Variables
This project depends on some environment variables. If you are running this project locally, create a .env file at the root of your project directory for these variables. Your host provider should include a feature to set them directly to avoid exposing sensitive information.

Required Environment Variables
Copier
DATABASE_URL=postgres://postgres:postgres@51.91.220.187:6543/boulguana
Generate Prisma Client
To generate the Prisma Client, which will include types based on your database schema, run the following command:

Copier
npx prisma generate
API Endpoints
Test Creating a Task
Use Postman or any API client to test the POST /tasks endpoint.

Request
Method: POST
Endpoint: /tasks
Headers:
Copier
Content-Type: application/json
Body:
Copier
{
  "title": "Complete project report",
  "description": "Submit the report by EOD",
  "category": "WORK",
  "userId": 1
}
Response (Success)
Copier
{
  "id": 1,
  "title": "Complete project report",
  "description": "Submit the report by EOD",
  "category": "WORK",
  "isDeleted": false,
  "createdAt": "2025-01-24T10:00:00.000Z",
  "updatedAt": "2025-01-24T10:00:00.000Z",
  "userId": 1
}
Response (Error - User not found)
Copier
{
  "error": "User not found."
}
Response (Error - Invalid Category)
Copier
{
  "error": "Invalid category. Valid categories are: WORK, PERSONAL, HEALTH, FITNESS, OTHER"
}
Linking Tasks to Users
The task is automatically linked to the user through the userId field. You can later fetch tasks for a user or by category.

Example: Get Tasks for a User by Category
Method: GET
Endpoint: /tasks/user/1/category/WORK
Response
Copier
[
  {
    "id": 1,
    "title": "Complete project report",
    "description": "Submit the report by EOD",
    "category": "WORK",
    "isDeleted": false,
    "createdAt": "2025-01-24T10:00:00.000Z",
    "updatedAt": "2025-01-24T10:00:00.000Z",
    "userId": 1
  }
]
