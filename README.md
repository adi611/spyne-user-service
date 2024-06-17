# User Service API Documentation

## Endpoints

### Register a User
- Method: POST
- Endpoint: /api/users/register
- Description: Register a new user with name, email, mobile number, and password.

### Login User
- Method: POST
- Endpoint: /api/users/login
- Description: Login with email and password to obtain a JWT token.

### Get User by ID
- Method: GET
- Endpoint: /api/users/:id
- Description: Get user details by ID. Requires authentication.

### Update User by ID
- Method: PUT
- Endpoint: /api/users/:id
- Description: Update user details by ID. Requires authentication.

### Delete User by ID
- Method: DELETE
- Endpoint: /api/users/:id
- Description: Delete a user by ID. Requires authentication.

### Follow a User
- Method: POST
- Endpoint: /api/users/follow
- Description: Follow another user. Requires authentication.

### Search Users
- Method: GET
- Endpoint: /api/users/search
- Description: Search for users by name or email. Requires authentication.

## Authentication
- The endpoints that require authentication (GET, PUT, DELETE, POST /follow, GET /search) use JWT tokens.
- Include the JWT token in the Authorization header with the format "Bearer <token>".

## How to Run
1. Clone the repository.
2. Install dependencies with `npm install`.
3. Set environment variables (e.g., PORT, MONGO_URI, JWT_SECRET) in a .env file.
4. Start the server with `npm start`.

## Example Requests
- Register a user:
  ```bash
  curl -X POST http://localhost:5000/api/users/register -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com", "mobile": "1234567890", "password": "password"}'
- Login:
  ```bash
  curl -X POST http://localhost:5000/api/users/login -H "Content-Type: application/json" -d '{"email": "john@example.com", "password": "password"}'
- Get user details (requires authentication):
  ```bash
  curl -X GET http://localhost:5000/api/users/<user_id> -H "Authorization: Bearer <jwt_token>"
- Update user details (requires authentication):
  ```bash
  curl -X PUT http://localhost:5000/api/users/<user_id> -H "Authorization: Bearer <jwt_token>" -H "Content-Type: application/json" -d '{"name": "John Smith"}'
- Delete user (requires authentication):
  ```bash
  curl -X DELETE http://localhost:5000/api/users/<user_id> -H "Authorization: Bearer <jwt_token>"
- Follow a user (requires authentication):
  ```bash
  curl -X POST http://localhost:5000/api/users/follow -H "Authorization: Bearer <jwt_token>" -H "Content-Type: application/json" -d '{"userIdToFollow": "<user_id_to_follow>"}'
- Search users (requires authentication):
  ```bash
  curl -X GET http://localhost:5000/api/users/search?query=<search_query> -H "Authorization: Bearer <jwt_token>"
Replace `<user_id>`, `<jwt_token>`, `<user_id_to_follow>`, and `<search_query>` with actual values when testing the endpoints.
## Diagram
    +------------------------------------------------+
    |                User Service                     |
    +------------------------------------------------+
    |               +----------------+                |
    |               |   API Gateway   |                |
    |               +----------------+                |
    |                      |                         |
    |                      |                         |
    |         +------------+------------+            |
    |         |            |            |            |
    | +----------------+ +-------------+ +-----------------+
    | |  Authentication| |   User      | |   User Data    |
    | |    Service     | |  Management | |    Storage      |
    | |                | |    Service  | |    (MongoDB)    |
    | +----------------+ +-------------+ +-----------------+
    |         |                  |                    |
    |         |                  |                    |
    | +-------------------+ +-----------------+ +----------------+
    | |     Router       | |    Controller  | |     Database    |
    | +-------------------+ +-----------------+ +----------------+
    |         |                  |                    |
    |         |                  |                    |
    | +------------------+ +--------------------+     |
    | |     Middleware  | |     Business Logic |     |
    | +------------------+ +--------------------+     |
    |         |                  |                    |
    |         +------------------+                    |
    |                       |                         |
    +------------------------------------------------+

### Explanation of Components:

1. **API Gateway**:
   - Acts as the entry point for external client requests.
   - Routes requests to the appropriate services based on the endpoint.

2. **Authentication Service**:
   - Handles user authentication and authorization.
   - Generates and validates JWT tokens.
   - Protects routes that require authentication.

3. **User Management Service**:
   - Manages user-related operations such as registration, login, profile updates, and deletions.
   - Handles user interactions and business logic related to user management.

4. **User Data Storage (MongoDB)**:
   - Stores user data including profiles, authentication details, and related information.
   - Provides data persistence for the user-service.

5. **Router**:
   - Defines API endpoints and routes incoming requests to the appropriate controllers.

6. **Controller**:
   - Implements the business logic for each endpoint.
   - Validates input data, processes requests, and interacts with the database.

7. **Middleware**:
   - Contains middleware functions such as authentication middleware to verify JWT tokens.
   - Executes before reaching the controller to perform pre-processing tasks.
