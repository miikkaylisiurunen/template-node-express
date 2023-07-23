<!-- omit from toc -->
# Node.js API Template

> A Node.js API template with Express, TypeScript and PostgreSQL

[![CI](https://github.com/miikkaylisiurunen/template-node-express/actions/workflows/ci.yml/badge.svg)](https://github.com/miikkaylisiurunen/template-node-express/actions/workflows/ci.yml)

<!-- omit from toc -->
## Table of contents

- [Features](#features)
- [How to use](#how-to-use)
  - [Requirements](#requirements)
  - [Getting started](#getting-started)
  - [Scripts](#scripts)
  - [Default routes](#default-routes)
- [Directory structure](#directory-structure)
- [Consistent error handling](#consistent-error-handling)
  - [Throwing consistent errors](#throwing-consistent-errors)
  - [Error handler middleware](#error-handler-middleware)
  - [Handling errors in asynchronous middleware](#handling-errors-in-asynchronous-middleware)
- [Testing](#testing)
  - [Running tests](#running-tests)
  - [Automated tests](#automated-tests)
- [Continuous integration](#continuous-integration)

## Features

- Continuous integration with GitHub Actions
- Type safety enforced with TypeScript to minimize errors and improve maintainability
- Custom error handling for better user experience and efficient bug tracking
- Runtime validation with [Zod](https://zod.dev/) to ensure data quality and consistency
- Database migrations using [node-pg-migrate](https://github.com/salsita/node-pg-migrate) for efficient database management
- Dockerfile for easy deployment and containerization
- Dependency injection for better testability and decoupling of code components
- Docker compose for convenient development database setup
- Dependabot integration for automatic npm package updates and improved security
- Code formatting and linting with [Prettier](https://prettier.io) and [ESLint](https://eslint.org/) to improve code quality and consistency
- Environment variable validation

## How to use

### Requirements

- Node.js v16 or higher
- Docker

### Getting started

1. Clone the repository:
   ```
   git clone https://github.com/miikkaylisiurunen/template-node-express.git
   ```
2. Change to the project directory:
   ```
   cd template-node-express
   ```
3. Copy `template.env` to `.env`:
   ```
   cp template.env .env
   ```
4. Install npm packages:
   ```
   npm install
   ```
5. Start the database services:
   ```
   docker-compose up -d
   ```
6. Start the development server:
   ```
   npm run dev
   ```

**Note:** If you update the database credentials in either the `.env` or `docker-compose.yml` file, be sure to also update the other file with the same changes to ensure that the database can still be accessed correctly.

### Scripts

```
start       # start the production server
dev         # start the development server
build       # build the project using tsc
lint        # find ESLint issues
lint:fix    # fix ESLint issues
test        # run tests
```

### Default routes

```
GET /people     # get all people from the database
POST /people    # add a new person with required body properties: "name" and "age"
```

## Directory structure

```
.
├── .github          # CI workflows and dependabot config to keep npm packages up to date
├── migrations       # database migration scripts
└── src
    ├── controllers  # route controllers
    ├── database     # database queries, tests and file to run migrations
    ├── errors       # custom errors for easier error handling
    ├── middleware   # middleware functions
    └── routes       # routes and their tests
```

## Consistent error handling

### Throwing consistent errors

To ensure consistent error responses and HTTP status codes, use the `HttpError` class when throwing an error. This custom error class is included in the template and provides a straightforward way to throw errors.

### Error handler middleware

An error handling middleware is included to handle and send consistent responses when errors occur. By default, the error response format is as follows:

```json
{
  "status": 401,
  "message": "Unauthorized"
}
```

You can specify your own `status` and `message` when using the custom `HttpError` class to throw errors. A catch-all error handler is also included which returns a `500` status code whenever an unhandled error is thrown.

### Handling errors in asynchronous middleware

As of version 4, [Express does not support promises](https://expressjs.com/en/guide/error-handling.html) natively, making it more challenging to handle errors inside asynchronous route handlers and middleware. However, you can use a `try/catch` block and call `next(error)` when an error is thrown:

```js
app.get('/route', async (req, res, next) => {
  try {
    // this might throw an error
    const user = await someAsyncFunction();
    res.send(user);
  } catch (error) {
    next(error);
  }
});
```

The application will crash if the error is not handled properly in an asynchronous middleware. If you have a lot of `async` middleware, the above approach can be repetitive. To handle this more efficiently, a wrapper function is included that automatically calls `next(error)` on errors:

```js
app.get('/route', catchAsyncError(async (req, res) => {
  // this might throw an error
  const user = await someAsyncFunction();
  res.send(user);
}));
```

The `catchAsyncError` function wraps the route handler and automatically calls `next(error)` when an error is thrown. The error is then handled by the error handling middleware. Both asynchronous middleware and route handlers are handled this way.

Synchronous route handlers and middleware can still be written normally without `try/catch` or the `catchAsyncError` wrapper. Here's an example using the custom `HttpError`:

```js
app.post('/route', (req, res) => {
  if (!req.body.name) {
    // this will go to the error handling middleware
    throw new HttpError(400, 'No name provided');
  }
  res.send(`Hello ${req.body.name}!`);
});
```

**Note:** You can use either `catchAsyncError` or `try/catch` to handle errors. The `catchAsyncError` function is only a helper function that can make your code cleaner and more concise by removing the need to use `try/catch` in each middleware.

## Testing

This template comes with tests powered by [Jest](https://jestjs.io) and [Supertest](https://github.com/ladjs/supertest) to ensure the quality and stability of your application through unit and integration testing.

### Running tests

You can manually run tests with the following command:

```
npm test
```

This command will run all tests in the `src` directory and output the results to the console.

### Automated tests

A GitHub Actions workflow is included to automatically run tests. Refer to the [Continuous integration](#continuous-integration) section for more information.

## Continuous integration

This template comes with pre-configured GitHub Actions workflows to automate continuous integration (CI) and ensure that your code is always tested before being merged into the main branch. The workflows run automatically on every push to the `main` branch, or when a pull request is opened, reopened, or synchronized.

The workflows included are:

- `ci.yml` - Runs tests and builds the project, preventing issues and bugs from making their way into production.
- `lint.yml` - Runs ESLint to find linting issues, ensuring that your code is always in compliance with your ESLint rules, which can improve code quality and consistency.

Additionally, a `dependabot.yml` configuration is included and run automatically on a weekly basis. It detects outdated npm packages and creates pull requests to update them, ensuring that your npm packages are always up to date, which can improve security and prevent bugs caused by outdated packages.
