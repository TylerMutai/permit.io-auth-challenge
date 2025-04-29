# Permit IO Auth Challenge API Documentation

## Overview

This API is built with [NestJS](https://nestjs.com), providing user authentication and management of documents and teams
with permission-based access control.

## Project setup

```bash
$ pnpm install
```

Obtain your Permit IO token and API key using [this tutorial by Permit.io](https://docs.permit.io/overview/connecting-your-app).
Also be sure to use the `Container PDP` instead of `Cloud PDP` since the project also utilizes __attribute based access control__. You can read more about this [here](https://docs.permit.io/how-to/build-policies/abac/overview).


## Environment Variables

- `APP_SECRET` (string): Secret key used for signing JWT tokens.
- `PERMIT_IO_TOKEN` (string): The API Key/Token you obtained from permit.io
- `PERMIT_IO_URL` (string): Be sure to deploy the docker container provided by permit.io (in the step above on how to obtain tokens and API keys). The URL should be: `http://localhost:7766`
  APP_SECRET="e29a7f3bdc584de6a1b2c49e3fd15db4"

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Base URL

```
http://localhost:3000
```

## Postman Collection
- At the root of the project, called `permit.io.postman_collection.json`

## Authentication

The API uses JWT for authentication.

- Obtain a token via the Sign In endpoint.
- Include the token in the `Authorization` header for protected endpoints:

```
Authorization: Bearer <token>
```

## Endpoints

### Health Check

**GET** `/`

- Description: Returns a greeting message.
- Authentication: None
- Response (200 OK):
    - Body: String

Example:

```bash
curl http://localhost:3000/
# Hello World!
```

---

### Sign In

**POST** `/auth/sign-in-with-email-password`

- Description: Authenticate a user with email and password.
- Authentication: None
- Request Body (application/json):

| Field    | Type                              | Required | Description                      |
|----------|-----------------------------------|----------|----------------------------------|
| source   | `'ios'` \| `'android'` \| `'web'` | No       | Client source platform           |
| email    | `string`                          | Yes      | User email (must be valid email) |
| password | `string`                          | Yes      | User password                    |

- Response (200 OK):

```json
{
  "status": 200,
  "message": "Success",
  "token": "<jwt_token>",
  "user": {
    "status": 200,
    "message": "Success",
    "payload": {
      "id": "admin_user",
      "name": "Admin User",
      "email": "adminuser@test.com",
      "role": {
        "role": "admin",
        "tenant": "default"
      }
    }
  }
}
```

- Response (401 Unauthorized):

```json
{
  "status": 401,
  "message": "Wrong email/password combination"
}
```

---

## Documents

All endpoints under `/documents` require authentication and appropriate permissions.

**Headers**:

```
Authorization: Bearer <token>
```

#### Get All Documents

**GET** `/documents`

- Description: Retrieve a list of all documents.
- Path Parameters: None
- Request Body: None
- Response (200 OK):

```json
{
  "status": 200,
  "message": "Success",
  "payload": [
    {
      "id": "string",
      "title": "string",
      "content": "string",
      "owners": [
        "string"
      ],
      "editors": [
        "string"
      ],
      "viewers": [
        "string"
      ]
    }
    // ...
  ]
}
```

#### Get Document by ID

**GET** `/documents/:id`

- Description: Retrieve a single document by its ID.
- Path Parameters:

| Parameter | Type     | Required | Description |
|-----------|----------|----------|-------------|
| id        | `string` | Yes      | Document ID |

- Response (200 OK):

```json
{
  "status": 200,
  "message": "Success",
  "payload": {
    "id": "string",
    "title": "string",
    "content": "string",
    "owners": [
      "string"
    ],
    "editors": [
      "string"
    ],
    "viewers": [
      "string"
    ]
  }
}
```

- Response (404 Not Found):

```json
{
  "status": 404,
  "message": "Document <id> not found"
}
```

- Response (403 Forbidden):

```json
{
  "status": 403,
  "message": "User not allowed to access document <id>"
}
```

#### Create Document

**POST** `/documents`

- Description: Create a new document.
- Request Body (application/json):

| Field   | Type                              | Required | Description             |
|---------|-----------------------------------|----------|-------------------------|
| source  | `'ios'` \| `'android'` \| `'web'` | No       | Client source platform  |
| title   | `string`                          | Yes      | Title of the document   |
| content | `string`                          | Yes      | Content of the document |
| owners  | `string[]`                        | No       | List of owner user IDs  |
| editors | `string[]`                        | No       | List of editor user IDs |
| viewers | `string[]`                        | No       | List of viewer user IDs |

- Response (200 OK):

```json
{
  "status": 200,
  "message": "Success",
  "payload": {
    "id": "string",
    "title": "string",
    "content": "string",
    "owners": [
      "string"
    ],
    "editors": [
      "string"
    ],
    "viewers": [
      "string"
    ]
  }
}
```

#### Update Document

**PATCH** `/documents/:id`

- Description: Update fields of an existing document.
- Path Parameters:

| Parameter | Type     | Required | Description |
|-----------|----------|----------|-------------|
| id        | `string` | Yes      | Document ID |

- Request Body (application/json):

| Field   | Type                              | Required | Description            |
|---------|-----------------------------------|----------|------------------------|
| source  | `'ios'` \| `'android'` \| `'web'` | No       | Client source platform |
| title   | `string`                          | No       | New document title     |
| content | `string`                          | No       | New document content   |
| owners  | `string[]`                        | No       | New owner user IDs     |
| editors | `string[]`                        | No       | New editor user IDs    |
| viewers | `string[]`                        | No       | New viewer user IDs    |

- Response (200 OK):

```json
{
  "status": 200,
  "message": "Success",
  "payload": {
    "id": "string",
    "title": "string",
    "content": "string",
    "owners": [
      "string"
    ],
    "editors": [
      "string"
    ],
    "viewers": [
      "string"
    ]
  }
}
```

#### Delete Document

**DELETE** `/documents/:id`

- Description: Delete a document.
- Path Parameters:

| Parameter | Type     | Required | Description |
|-----------|----------|----------|-------------|
| id        | `string` | Yes      | Document ID |

- Response (204 No Content):

```json
{
  "status": 204,
  "message": "Success"
}
```

---

## Teams

All endpoints under `/teams` require authentication and appropriate permissions.

**Headers**:

```
Authorization: Bearer <token>
```

#### Get All Teams

**GET** `/teams`

- Description: Retrieve a list of all teams.
- Response (200 OK):

```json
{
  "status": 200,
  "message": "Success",
  "payload": [
    {
      "id": "string",
      "name": "string",
      "userIds": [
        "string"
      ]
    }
    // ...
  ]
}
```

#### Get Team by ID

**GET** `/teams/:id`

- Description: Retrieve a single team by its ID.
- Path Parameters:

| Parameter | Type     | Required | Description |
|-----------|----------|----------|-------------|
| id        | `string` | Yes      | Team ID     |

- Response (200 OK):

```json
{
  "status": 200,
  "message": "Success",
  "payload": {
    "id": "string",
    "name": "string",
    "userIds": [
      "string"
    ]
  }
}
```

- Response (404 Not Found):

```json
{
  "status": 404,
  "message": "Team <id> not found"
}
```

#### Create Team

**POST** `/teams`

- Description: Create a new team.
- Request Body (application/json):

| Field   | Type                              | Required | Description                        |
|---------|-----------------------------------|----------|------------------------------------|
| source  | `'ios'` \| `'android'` \| `'web'` | No       | Client source platform             |
| name    | `string`                          | Yes      | Name of the team                   |
| userIds | `string[]`                        | Yes      | List of user IDs belonging to team |

- Response (200 OK):

```json
{
  "status": 200,
  "message": "Success",
  "payload": {
    "id": "string",
    "name": "string",
    "userIds": [
      "string"
    ]
  }
}
```

#### Update Team

**PATCH** `/teams/:id`

- Description: Update fields of an existing team.
- Path Parameters:

| Parameter | Type     | Required | Description |
|-----------|----------|----------|-------------|
| id        | `string` | Yes      | Team ID     |

- Request Body (application/json):

| Field   | Type       | Required | Description          |
|---------|------------|----------|----------------------|
| name    | `string`   | No       | New name of the team |
| userIds | `string[]` | No       | New list of user IDs |

- Response (200 OK):

```json
{
  "status": 200,
  "message": "Success",
  "payload": {
    "id": "string",
    "name": "string",
    "userIds": [
      "string"
    ]
  }
}
```

#### Delete Team

**DELETE** `/teams/:id`

- Description: Delete a team.
- Path Parameters:

| Parameter | Type     | Required | Description |
|-----------|----------|----------|-------------|
| id        | `string` | Yes      | Team ID     |

- Response (204 No Content):

```json
{
  "status": 204,
  "message": "Success"
}
```

---

## Error Handling

All error responses follow the structure:

```json
{
  "status": "<HTTP status code>",
  "message": "<Error message>"
}
```

Appropriate HTTP status codes are used for errors (e.g., 400, 401, 403, 404).
