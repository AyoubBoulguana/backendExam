Getting Started
Prerequisites
Run the following command to install dependencies:

npm install

Environment variables
This project depends on some environment variables. If you are running this project locally, create a .env file at the root for these variables. Your host provider should included a feature to set them there directly to avoid exposing them.

Here are the required ones:

DATABASE_URL=postgres://postgres:postgres@51.91.220.187:6543/boulguana

Generate your Prisma client
Run the following command to generate the Prisma Client which will include types based on your database schema:

npx prisma generate

Test Creating a Task
Use Postman or any API client to test the POST /tasks endpoint.

Request:
http
Copy
Edit
POST /tasks
Content-Type: application/json
Body:
{
  "title": "Complete project report",
  "description": "Submit the report by EOD",
  "category": "WORK",
  "userId": 1
}
Response (Success):
json
Copy
Edit
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
Response (Error - User not found):
json
Copy
Edit
{
  "error": "User not found."
}
Response (Error - Invalid Category):
json
Copy
Edit
{
  "error": "Invalid category. Valid categories are: WORK, PERSONAL, HEALTH, FITNESS, OTHER"
}
Linking Tasks to Users
The task is automatically linked to the user through the userId field. You can later fetch tasks for a user or by category.

Example: Get Tasks for a User by Category
http
Copy
Edit
GET /tasks/user/1/category/WORK
Response:

json
Copy
Edit
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
