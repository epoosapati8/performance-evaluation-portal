# Performance Evaluation Portal-be

Performance Evaluation Portal-be is functional in Node-js, React-JS with the BRD requirements of Performance Evaluation Portal-fe.

- Solutions that let the employees evaluate their own performance.

- Solutions that let the management evaluate the performance of employees.

- Developed for Web Application (React platform).

## Tech Stack

- [node.js] - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- [VSCode] - Source code editor.
- [Express] - Node.js web application app framework.
- [Mongo DB] - NoSQL database.
- [Mongoose] - ODM for Mongo DB and node.js.

## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environment.

### Node

- Node installation on Windows
  Just go on official Node.js website and download the installer. Also, be sure to have git available in your PATH, npm might need it (You can find git here).

- Node installation on Ubuntu
  You can install nodejs and npm easily with apt install, just run the following commands.

```
$ sudo apt install nodejs
$ sudo apt install npm
```

- Other Operating Systems
  You can find more information about the installation on the official Node.js website and the official NPM website.

If the installation was successful, you should be able to run the following command.

```
$ node --version

$ npm --version
```

## Installation

The Project was built using (Node.js) v12 during development.

After cloning the project, install the dependencies and start the server.

```
$ npm install
$ npm start
```

## Database Setup and Installation

Install Mongo DB (based on your OS) by using -

(https://docs.mongodb.com/manual/administration/install-community/)

Install Mongo DB Compass by using -

(https://www.mongodb.com/try/download/compass)

## Folder Structure

```

├── collections
│   ├── controllers
│   │   ├── designations-controller.ts
│   │   ├── employees-controller.ts
│   │   ├── notifications-controller.ts
│   │   ├── perf-eval-ans-controller.ts
│   │   ├── projects-controller.ts
│   │   ├── projects-emp-controller.ts
│   │   ├── report-a-bug-controller.ts
│   │   ├── score-sheet-ans-controller.ts
│   │   ├── score-sheet-ques-controller.ts
│   │   ├── self-eval-ques-controller.ts
│   │   └── users-controller.ts
│   ├── DAL
│   │   ├── designations-dal.ts
│   │   ├── employees-dal.ts
│   │   ├── notifications-dal.ts
│   │   ├── perf-eval-ans-dal.ts
│   │   ├── projects-dal.ts
│   │   ├── projects-emp-dal.ts
│   │   ├── report-a-bug-dal.ts
│   │   ├── score-sheet-ans-dal.ts
│   │   ├── score-sheet-ques-dal.ts
│   │   ├── self-eval-ques-dal.ts
│   │   └── users-dal.ts
│   ├── models
│   │   ├── designations-model.ts
│   │   ├── employees-model.ts
│   │   ├── notifications-model.ts
│   │   ├── perf-eval-ans-model.ts
│   │   ├── projects-emp-model.ts
│   │   ├── projects-model.ts
│   │   ├── report-a-bug-model.ts
│   │   ├── score-sheet-ans-model.ts
│   │   ├── score-sheet-ques-models.ts
│   │   ├── self-eval-ques-models.ts
│   │   └── users-model.ts
│   ├── routes
│   │   ├── designations-router.ts
│   │   ├── employees-router.ts
│   │   ├── notifications-router.ts
│   │   ├── perf-eval-ans-router.ts
│   │   ├── projects-emp-router.ts
│   │   ├── projects-router.ts
│   │   ├── report-a-bug-router.ts
│   │   ├── score-sheet-ans-router.ts
│   │   ├── score-sheet-ques-router.ts
│   │   ├── self-eval-ques-router.ts
│   │   └── users-router.ts
│   ├── services
│   │   ├── designations-service.ts
│   │   ├── employees-service.ts
│   │   ├── notification-service.ts
│   │   ├── perf-eval-ans-service.ts
│   │   ├── projects-emp-service.ts
│   │   ├── projects-service.ts
│   │   ├── report-a-bug-service.ts
│   │   ├── score-sheet-ans-service.ts
│   │   ├── score-sheet-ques-service.ts
│   │   ├── self-eval-ques-service.ts
│   │   └── users-service.ts
│   └── validations
│       ├── employees-validation.ts
│       └── users-validation.ts
├── commons
│   ├── constants.ts
│   ├── controller.ts
│   ├── dal-error.ts
│   ├── http-status-error.ts
│   └── request-controller.ts
├── middlewares
│   ├── error.ts
│   ├── http.ts
│   ├── swagger.ts
│   ├── verify-refresh-token.ts
│   ├── verify-role.ts
│   ├── verify-token.ts
│   └── views.ts
├── providers
│   ├── app.ts
│   ├── database.ts
│   ├── locals.ts
│   ├── routes.ts
│   └── server.ts
└── response-status.ts
```
