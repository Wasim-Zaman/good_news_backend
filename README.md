# News API

## Description

This project is a robust News API built with Node.js and Express.js, utilizing Prisma as an ORM for database operations. It provides a comprehensive set of endpoints for managing various aspects of a news platform, including user management, post creation and management, reporter management, category management, and advertisement handling.

## Features

- User Authentication and Management
- Post Creation, Retrieval, and Management
- Reporter Registration and Management
- Category Management
- Advertisement Handling
- Swagger API Documentation

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- MySQL Database
- Swagger for API documentation
- Multermate for file uploads
- Joi for input validation

## Project Structure

The project follows a modular structure with separate routes and controllers for different functionalities:

- `app.js`: The main application file that sets up the Express server and middleware.
- `routes/`: Contains route definitions for different modules.
- `controllers/`: Houses the business logic for each module.
- `middleware/`: Custom middleware functions, including authentication.
- `utils/`: Utility functions and custom error handling.
- `docs/`: Swagger documentation files.
- `prisma/`: Prisma schema and migration files.

## Key Modules

1. **Admin**: Handles admin-related operations.
2. **User**: Manages user registration, authentication, and profile management.
3. **Post**: Handles creation, retrieval, updating, and deletion of news posts.
4. **Advertisement**: Manages advertisements within the platform.
5. **Reporter**: Handles reporter registration and management.
6. **Category**: Manages news categories.

## API Documentation

The API is documented using Swagger. You can access the Swagger UI at `/api-docs` when the server is running.

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your MySQL database
4. Configure your `.env` file with necessary environment variables
5. Run Prisma migrations: `npx prisma migrate dev`
6. Start the server: `npm start`

## API Endpoints

The API provides various endpoints for different functionalities. Here's a brief overview:

- `/api/admin/v1`: Admin-related endpoints
- `/api/users/v1`: User management endpoints
- `/api/post/v1`: Post management endpoints
- `/api/advertisement/v1`: Advertisement management endpoints
- `/api/reporter/v1`: Reporter management endpoints
- `/api/category`: Category management endpoints

For detailed information on each endpoint, please refer to the Swagger documentation.

## Error Handling

The application uses custom error handling to provide consistent error responses across all endpoints. Errors are logged for debugging purposes.

## File Uploads

File uploads (e.g., images for posts or reporter profiles) are handled using Multermate, with files stored in the `uploads` directory.

## Security

- JWT is used for authentication
- Input validation is performed using Joi
- CORS is enabled for cross-origin requests

## Future Enhancements

Future versions of the API may include additional modules such as blogs, live news, RSS feeds, e-paper management, and content management system (CMS) functionality.

## Contributing

Contributions to the project are welcome. Please ensure to follow the existing code style and add unit tests for any new features.

## License

MIT License

Copyright (c) 2024 Wasim Zaman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
