```
npm run dev
npm run start
npm test
```

<b>LINKS</b>

```
https://task-expressjs-api-0c787f37eebb.herokuapp.com
```

<b>ROUTES</b><br>

GET

```
/API/v1/tasks: Get a list of all tasks.
attributes: page, pageSize, sortBy, sortOrder
example 1 : https://task-expressjs-api-0c787f37eebb.herokuapp.com/API/v1/tasks
example 2 : https://task-expressjs-api-0c787f37eebb.herokuapp.com/API/v1/tasks?page=1&pageSize=20&sortBy=description&sortOrder=desc
```

GET By ID

```
/API/v1/tasks/:id: Get a specific task by ID.
example : https://task-expressjs-api-0c787f37eebb.herokuapp.com/API/v1/tasks/1
```

POST

```
/API/v1/tasks: Create a new task.
body: {title:"string", "description": "string", "completed": boolean }
```

PUT<br>

```
/API/v1/tasks/:id: Update a task by ID
body: {title:"string", "description": "string", "completed": boolean }
```

DELETE

```
/API/v1/tasks/:id: Delete a task by ID.
example : https://task-expressjs-api-0c787f37eebb.herokuapp.com/API/v1/tasks/1
```

<b>STRUCTUR FOLDER</b><br>

```
|-- src
| |-- controllers
| |-- models
| |-- routes
| |-- app.js
|-- test
```
