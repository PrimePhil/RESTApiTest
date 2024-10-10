
# User Management System

## Backend (Spring Boot)
The backend for this project is developed using **Spring Boot** and **Java 17**. It exposes RESTful API endpoints to manage users.

### Endpoints
- **POST /users**: Creates a new user with the provided details.
- **GET /users**: Returns a list of all users.
- **GET /users/{id}**: Returns details of a user by ID.
- **PUT /users/{id}**: Updates a user with the given ID.
- **DELETE /users/{id}**: Deletes a user with the specified ID.

### How to run the backend
1. Ensure **Java 17** and **Maven** are installed.
2. Navigate to the project directory and run:
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```
3. The backend will run at `http://localhost:8080`.

## Frontend (React)
The frontend is developed using **React**. It interacts with the backend through HTTP requests.

### How to run the frontend
1. Ensure **Node.js** and **npm** are installed.
2. Navigate to the `frontend` directory (user-management-frontend) and run:
    ```bash
    npm install
    npm start
    ```
3. The frontend will run at `http://localhost:3000`. It is very basic, just to show the functionnalities asked for the different endpoints used.
The Show Single User function is based on my understanding of what was asked.

### Buttons and Their Functionality
- **Create User**: Generates a new random user and sends a `POST /users` request to create the user in the backend.
- **Show Users**: Sends a `GET /users` request to list all users.
- **Hide Users**: Hides the list of users.
- **Show Single User**: Allows the input of a username to search for, and if found, displays the user's info.
- **Show User Info**: For each user in the list, this button shows detailed information about the user by sending a `GET /users/{id}` request.
- **Edit**: Allows modification of the selected user's info by sending a `PUT /users/{id}` request.
- **Delete**: Deletes the user by sending a `DELETE /users/{id}` request.

### Tech Stack
- **Backend**: Spring Boot, Java 17, Maven
- **Frontend**: React, Axios
- **Database**: In-memory H2 database for testing
