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
