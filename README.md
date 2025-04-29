# Permit IO Auth Challenge: Document and Team Management API with Fine-Grained Access Control

## Overview

This API, built with [NestJS](https://nestjs.com), demonstrates a robust and API-first approach to authorization using [Permit.io](https://docs.permit.io/). It provides user authentication and manages documents and teams with a sophisticated permission-based access control system.

**Key Features Demonstrating Thoughtful Authorization:**

* **Externalized Authorization:** Access control decisions are handled by Permit.io, not hardcoded within the application logic, adhering to API-first principles.
* **Declarative Policies:** Permissions are defined through clear and manageable policies in Permit.io, allowing for easy updates and auditing.
* **Attribute-Based Access Control (ABAC):** The application leverages ABAC (as indicated by the use of Container PDP) to enforce fine-grained control based on user and resource attributes (e.g., document ownership, document editors and document viewers).
* **Real-World Scenarios:** The document and team management domains showcase practical access control challenges and their elegant solutions using Permit.io.

## Project Setup

This section guides you through setting up the project and connecting it to Permit.io.

### Prerequisites

* [Node.js](https://nodejs.org/) (version >= 18 recommended)
* [pnpm](https://pnpm.io/) (or npm)
* [Docker](https://www.docker.com/) (for running the Permit.io Container PDP)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/TylerMutai/permit.io-auth-challenge.git
    cd permit.io-auth-challenge
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

### Connecting to Permit.io (Container PDP with ABAC)

This project utilizes the **Container PDP** from Permit.io to leverage Attribute-Based Access Control (ABAC). Follow these steps to connect your application:

1.  **Obtain your Permit.io Token and API Key:** Follow the official [Permit.io tutorial on connecting your app](https://docs.permit.io/overview/connecting-your-app).

2.  **Deploy the Permit.io Container PDP:** Instead of the Cloud PDP, you will need to deploy the Docker container provided by Permit.io. This is essential for demonstrating __Attribute Based Access Control (ABAC)__ effectively since the cloud based PDP does not support this. The documentation for setting up the Container PDP can be found [here](https://docs.permit.io/how-to/deploy/deploy-to-production).
    - The TLDR version is:
    1. Install docker: https://docs.docker.com/get-started/get-docker/
    2. Run the docker container:
    ```bash
    docker run -it \
    -p 7766:7000 \
    --env PDP_API_KEY=<YOUR_PERMIT_IO_API_KEY> \
    --env PDP_DEBUG=True \
    permitio/pdp-v2:latest
    ```
    Your pdp server should now be running under `http://localhost:7766`

    If you get errors that the URL `http://localhost:8181` is unreachable (your OPA REST API - OPA stands for Open Policy Agent, and is the policy enforcement engine that "lets you specify policy as code and simple APIs to offload policy decision-making from your software.". You can read more about them [here.](https://www.openpolicyagent.org/docs/latest/)), run the following:
    ```bash
    docker run -it \
    -p 8181:8181 \
    --env PDP_API_KEY=<YOUR_PERMIT_IO_API_KEY> \
    --env PDP_DEBUG=True \
    permitio/pdp-v2:latest
    ```
    This will expose your OPA REST API on the port 8181.

3.  **Configure Environment Variables:** Create a `.env` file in the root of your project and add the following environment variables (feel free to use the `.env.example` file at the root of the project as a reference):

    ```
    APP_SECRET="your_secret_key"
    PERMIT_IO_TOKEN="your_permit_io_api_key"
    PERMIT_IO_URL="http://localhost:7766" # Default URL for the Container PDP
    ```

    **Note:** Replace `"your_secret_key"` (which is any random and secure alphanumeric string that you can generate online) and `"your_permit_io_api_key"` with your actual values. Ensure the `PERMIT_IO_URL` points to where your Permit.io Container PDP is running, which ideally should be `http://localhost:7766` if you used the default configurations highlighted above.

4.  **Understand Attribute-Based Access Control (ABAC):** This project demonstrates ABAC, where access decisions are based on attributes of the user, the resource (document/team), and the environment. You can learn more about ABAC concepts on the [Permit.io ABAC overview page](https://docs.permit.io/how-to/build-policies/abac/overview).

5. __An important thing to note: [This URL for the audit log](https://app.permit.io/audit) will come in handy when trying to debug permission policies. It provides a detailed log of reasons why access to a particular resource was denied, which is handy especially in debugging attribute-based access controls.__

## Running the Application

```bash
# Development mode with live reloading
pnpm run start:dev

# Production mode
pnpm run start:prod
```

The API will be accessible at `http://localhost:3000`.

## API Documentation

### Base URL

```
http://localhost:3000
```

### Authentication

The API uses JWT for authentication.

* Obtain a JWT token by calling the **Sign In** endpoint.
* Include the token in the `Authorization` header of protected requests:

    ```
    Authorization: Bearer <token>
    ```

### Endpoints

#### Health Check

**GET** `/`

-   Description: Returns a simple greeting to verify the API is running.
-   Authentication: None
-   Response (200 OK):
    ```json
    "Hello World!"
    ```

---

#### Sign In

**POST** `/auth/sign-in-with-email-password`

-   Description: Authenticates a user using their email and password and returns a JWT token.
-   Authentication: None
-   Request Body (application/json):

    | Field    | Type                              | Required | Description                                   |
        |----------|-----------------------------------|----------|-----------------------------------------------|
    | source   | `'ios'` \| `'android'` \| `'web'` | No       | Client platform (optional, for context)       |
    | email    | `string`                          | Yes      | User's email address (must be a valid format) |
    | password | `string`                          | Yes      | User's password                               |

-   Response (200 OK):

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

-   Response (401 Unauthorized):

    ```json
    {
      "status": 401,
      "message": "Wrong email/password combination"
    }
    ```

---

## Documents API

These endpoints demonstrate permission-based access control for documents using Permit.io.

**Authorization Logic (Managed by Permit.io):**

Access to documents is governed by policies defined in Permit.io. These policies consider the authenticated user's roles, the document's attributes (e.g., owners, editors, viewers), and potentially other contextual information. The API interacts with the Permit.io PDP to enforce these policies before allowing access to resources.

**Headers:**

```
Authorization: Bearer <token>
```

#### Get All Documents

**GET** `/documents`

-   Description: Retrieves a list of all documents that the authenticated user has **view** permission for, according to Permit.io policies.
-   Path Parameters: None
-   Request Body: None
-   Response (200 OK):

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
      ]
    }
    ```

#### Get Document by ID

**GET** `/documents/:id`

-   Description: Retrieves a specific document by its ID, only if the authenticated user has **view** permission for that document according to Permit.io policies.
-   Path Parameters:

    | Parameter | Type     | Required | Description |
        |-----------|----------|----------|-------------|
    | id        | `string` | Yes      | Document ID |

-   Response (200 OK):

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

-   Response (404 Not Found):

    ```json
    {
      "status": 404,
      "message": "Document <id> not found"
    }
    ```

-   Response (403 Forbidden):

    ```json
    {
      "status": 403,
      "message": "User not allowed to access document <id>"
    }
    ```

#### Create Document

**POST** `/documents`

-   Description: Creates a new document. The authenticated user automatically gains **owner** permission for the created document through Permit.io policies.
-   Request Body (application/json):

    | Field   | Type                              | Required | Description                |
        |---------|-----------------------------------|----------|----------------------------|
    | source  | `'ios'` \| `'android'` \| `'web'` | No       | Client platform (optional) |
    | title   | `string`                          | Yes      | Title of the document      |
    | content | `string`                          | Yes      | Content of the document    |
    | owners  | `string[]`                        | No       | Initial list of owner IDs  |
    | editors | `string[]`                        | No       | Initial list of editor IDs |
    | viewers | `string[]`                        | No       | Initial list of viewer IDs |

-   Response (200 OK):

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

-   Description: Updates fields of an existing document. Only users with **edit** or **owner** permissions (as determined by Permit.io) can perform this action.
-   Path Parameters:

    | Parameter | Type     | Required | Description |
        |-----------|----------|----------|-------------|
    | id        | `string` | Yes      | Document ID |

-   Request Body (application/json):

    | Field   | Type                              | Required | Description            |
        |---------|-----------------------------------|----------|------------------------|
    | source  | `'ios'` \| `'android'` \| `'web'` | No       | Client platform        |
    | title   | `string`                          | No       | New document title     |
    | content | `string`                          | No       | New document content   |
    | owners  | `string[]`                        | No       | New list of owner IDs  |
    | editors | `string[]`                        | No       | New list of editor IDs |
    | viewers | `string[]`                        | No       | New list of viewer IDs |

-   Response (200 OK):

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

-   Description: Deletes a document. Only users with **owner** permission (as determined by Permit.io) can perform this action.
-   Path Parameters:

    | Parameter | Type     | Required | Description |
        |-----------|----------|----------|-------------|
    | id        | `string` | Yes      | Document ID |

-   Response (204 No Content):

    ```json
    {
      "status": 204,
      "message": "Success"
    }
    ```

---

## Teams API

These endpoints demonstrate permission-based access control for teams using Permit.io.

**Authorization Logic (Managed by Permit.io):**

Access to teams is also governed by policies defined in Permit.io. These policies might consider user roles and team memberships to determine who can view, create, update, or delete teams.

**Headers:**

```
Authorization: Bearer <token>
```

#### Get All Teams

**GET** `/teams`

-   Description: Retrieves a list of all teams that the authenticated user has **view** permission for, according to Permit.io policies.
-   Response (200 OK):

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
      ]
    }
    ```

#### Get Team by ID

**GET** `/teams/:id`

-   Description: Retrieves a specific team by its ID, only if the authenticated user has **view** permission for that team according to Permit.io policies.
-   Path Parameters:

    | Parameter | Type     | Required | Description |
        |-----------|----------|----------|-------------|
    | id        | `string` | Yes      | Team ID     |

-   Response (200 OK):

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

-   Response (404 Not Found):

    ```json
    {
      "status": 404,
      "message": "Team <id> not found"
    }
    ```

#### Create Team

**POST** `/teams`

-   Description: Creates a new team. The authenticated user might automatically gain certain permissions for the created team based on Permit.io policies (e.g., membership or admin rights).
-   Request Body (application/json):

    | Field   | Type                              | Required | Description                      |
        |---------|-----------------------------------|----------|----------------------------------|
    | source  | `'ios'` \| `'android'` \| `'web'` | No       | Client platform (optional)       |
    | name    | `string`                          | Yes      | Name of the team                 |
    | userIds | `string[]`                        | Yes      | List of initial user IDs in team |

-   Response (200 OK):

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

-   Description: Updates fields of an existing team. Only users with appropriate permissions (e.g., team admin) as determined by Permit.io can perform this action.
-   Path Parameters:

    | Parameter | Type     | Required | Description |
        |-----------|----------|----------|-------------|
    | id        | `string` | Yes      | Team ID     |

-   Request Body (application/json):

    | Field   | Type       | Required | Description          |
        |---------|------------|----------|----------------------|
    | name    | `string`   | No       | New name of the team |
    | userIds | `string[]` | No       | New list of user IDs |

-   Response (200 OK):

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

-   Description: Deletes a team. Only users with specific permissions (e.g., organization admin) as determined by Permit.io can perform this action.
-   Path Parameters:

    | Parameter | Type     | Required | Description |
        |-----------|----------|----------|-------------|
    | id        | `string` | Yes      | Team ID     |

-   Response (204 No Content):

    ```json
    {
      "status": 204,
      "message": "Success"
    }
    ```

---

## Error Handling

All error responses follow a consistent structure:

```json
{
  "status": "<HTTP status code>",
  "message": "<Error message>"
}
```

The API utilizes standard HTTP status codes to indicate the outcome of requests (e.g., 400 for bad requests, 401 for unauthorized access, 403 for forbidden actions, 404 for not found resources).

## Postman Collection

A Postman collection containing example requests for all endpoints is available at the root of the project: `permit.io.postman_collection.json`. This can be imported into Postman to easily test the API.

## Demonstrating API-First Authorization with Permit.io

This project showcases an API-first authorization approach by:

* **Decoupling Authorization Logic:** All authorization decisions are delegated to the external Permit.io PDP. The API itself does not contain any hardcoded access control rules.
* **Treating Authorization as a Core API Design Element:** The API endpoints are designed with authorization in mind. For example, the "Get All Documents" endpoint implicitly returns only the documents the user is authorized to view, as determined by Permit.io.