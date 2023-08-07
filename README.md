# Task Management System | NestJS - Assignment
## Description
This is a simple Task Management System built using NestJS. It provides endpoints to perform CRUD operations on tasks. The tasks are managed in-memory, meaning they won't persist between application restarts.

### Setup
Clone the repository:
`git clone https://github.com/Anas17Ahmed/task-management-system-sl-nestjs-assignment.git`

Change directory
`cd task-management-system-sl-nestjs-assignment`

Install dependencies:
`npm install`

### Starting the Application
To start the NestJS application in development mode, run:
`npm run start:dev`

The application will be available at `http://localhost:3000`.

### API Endpoints

#### Create a Task
Method: POST
Endpoint: /tasks

Body:
```
{
  "title": "Sample Task",
  "description": "This is a sample task.",
  "status": "In Progress",
  "dueDate": "2023-08-15"
}
```

Response:
```
{
  "id": 1,
  "title": "Sample Task",
  "description": "This is a sample task.",
  "status": "In Progress",
  "dueDate": "2023-08-15",
  "createdAt": "2023-08-07T15:00:00.000Z",
  "updatedAt": "2023-08-07T15:00:00.000Z"
}
```

#### Get All Tasks
Method: GET
Endpoint: /tasks

Response:
```
[
  {
    "id": 1,
    "title": "Sample Task",
    "description": "This is a sample task.",
    "status": "In Progress",
    "dueDate": "2023-08-15",
    "createdAt": "2023-08-07T15:00:00.000Z",
    "updatedAt": "2023-08-07T15:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Another Task",
    "description": "This is another task.",
    "status": "Pending",
    "dueDate": "2023-08-20",
    "createdAt": "2023-08-07T16:00:00.000Z",
    "updatedAt": "2023-08-07T16:00:00.000Z"
  }
]
```

#### Get Task by ID
Method: GET
Endpoint: /tasks/1

Response:
```
{
  "id": 1,
  "title": "Sample Task",
  "description": "This is a sample task.",
  "status": "In Progress",
  "dueDate": "2023-08-15",
  "createdAt": "2023-08-07T15:00:00.000Z",
  "updatedAt": "2023-08-07T15:00:00.000Z"
}
```

#### Update a Task
Method: PUT
Endpoint: /tasks/1
Body:
```
{
  "status": "Completed"
}
```

Response:
```
{
  "id": 1,
  "title": "Sample Task",
  "description": "This is a sample task.",
  "status": "Completed",
  "dueDate": "2023-08-15",
  "createdAt": "2023-08-07T15:00:00.000Z",
  "updatedAt": "2023-08-07T17:00:00.000Z"
}
```

#### Delete a Task
Method: DELETE
Endpoint: /tasks/1

Response:
```
{}
```
