# Task Express.js API

This is a RESTful API for managing tasks built with Express.js and Sequelize. The API provides endpoints for creating, reading, updating, and deleting tasks.

## Author

- Saifudin
- Email: qsaifudin.official@gmail.com
- Website: [https://qsaifudin.site](https://qsaifudin.site)

## Application Link

The API is deployed on Heroku: [Task Express.js API](https://task-expressjs-api-0c787f37eebb.herokuapp.com)

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Routes](#routes)
  - [GET /API/v1/tasks](#get-apiv1tasks)
  - [GET /API/v1/tasks/:id](#get-apiv1tasksid)
  - [POST /API/v1/tasks](#post-apiv1tasks)
  - [PUT /API/v1/tasks/:id](#put-apiv1tasksid)
  - [DELETE /API/v1/tasks/:id](#delete-apiv1tasksid)
- [Folder Structure](#folder-structure)
- [Unit Tests](#unit-tests)

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

Clone this repository to your local machine:

```bash
git clone https://github.com/your-repo/task-express-api.git
cd task-express-api
npm install
```

Start the development server (with nodemon for auto-reloading during development):

```bash
npm run dev
```

Start the production server:

```bash
npm start
```

### Routes

#### GET /API/v1/tasks

- Get a list of all tasks.
- Query Parameters:
  - page: Page number (default: 1)
  - pageSize: Number of items per page (default: 10)
  - sortBy: Sorting field (default: 'id')
  - sortOrder: Sorting order ('asc' or 'desc', default: 'asc')
  - title: Filter by task title (optional)

Example requests:

- Get all tasks: https://task-expressjs-api-0c787f37eebb.herokuapp.com/API/v1/tasks
- Get tasks with pagination and sorting: https://task-expressjs-api-0c787f37eebb.herokuapp.com/API/v1/tasks?page=1&pageSize=20&sortBy=description&sortOrder=desc

#### GET /API/v1/tasks/:id

- Get a specific task by ID.
- Example request: https://task-expressjs-api-0c787f37eebb.herokuapp.com/API/v1/tasks/1

#### POST /API/v1/tasks

- Create a new task.
- Request Body:

```json
{
  "title": "Task Title",
  "description": "Task Description",
  "completed": true
}
```

#### PUT /API/v1/tasks/:id

- Update a task by ID.
- Request Body:

```json
{
  "title": "Task Title",
  "description": "Task Description",
  "completed": true
}
```

#### DELETE /API/v1/tasks/:id

- Delete a task by ID.
- Example request: https://task-expressjs-api-0c787f37eebb.herokuapp.com/API/v1/tasks/1

### Folder Structure

The project follows the following folder structure:

```bash
|-- src
| |-- controllers
| |-- models
| |-- routes
| |-- app.js
|-- tests
```

### Unit Tests

Unit tests for the routes and handlers are included in the tests folder. You can run the tests using the following command:

```bash
npm test
```
