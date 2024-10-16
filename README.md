# Social Media Task Backend

## Description
This is the backend for a social media task application that allows users to submit their name, social media handle, and upload multiple images. Admin functionality is included for managing user data through a dedicated admin interface.

## Features
- **User Form**: Users can submit their name, social media handle, and upload multiple images.
- **Data Storage**: All user submissions are stored in a MongoDB database.
- **Admin Dashboard**: Admins can view all users and delete users as needed.

## Tech Stack
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js to create APIs easily.
- **MongoDB**: NoSQL database to store user data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Multer**: Middleware for handling file uploads.
- **dotenv**: Module to load environment variables from a `.env` file.

## Getting Started

### Prerequisites
- Node.js installed on your machine.
- MongoDB (preferably MongoDB Compass) installed and set up.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/DevKaranJ/social-media-task.git
   cd social-media-task/server
2. Install the dependencies:

```bash
npm install
```
3. Create a .env file in the root directory and add your MongoDB connection string:
```bash
MONGODB_URI=mongodb://your_mongo_db_uri
PORT=5000
```
4. (Optional) Seed the database with demo data:

``` bash
node seed.js
```

# Running the Application
To start the server, run:

```bash
node index.js
```
The server will run on http://localhost:5000.

# API Endpoints
# User Endpoints
Create User

URL: POST /api/users
Body: { "name": "John Doe", "socialMediaHandle": "@john_doe", "images": [file] }
Response: { "success": true, "data": { /* user data */ }}
Get All Users

URL: GET /api/users
Response: { "success": true, "data": [/* array of users */] }
# Admin Endpoints
Get All Users (Admin)

URL: GET /api/admin
Response: { "success": true, "data": [/* array of users */] }
Delete User by ID (Admin)

URL: DELETE /api/admin/:id
Response: { "success": true, "message": "User deleted successfully" }
# Error Handling
The application includes error handling for various scenarios, such as failed database connections or validation errors.
