*This is a submission for the [Permit.io Authorization Challenge](https://dev.to/challenges/permit_io): API-First Authorization Reimagined*

## What I Built

I built a **Document and Team Management API** using NestJS that elegantly implements API-first authorization using Permit.io. This application goes beyond basic CRUD operations by demonstrating real-world access control scenarios for documents (viewing, editing, owning) and teams (viewing, creating, managing members). The core problem it solves is providing a secure and flexible way to manage access to sensitive resources in a multi-user environment, where permissions are not hardcoded but dynamically enforced based on external policies and attributes managed by Permit.io. This allows for a more scalable, auditable, and maintainable authorization system.

## Demo

While a live deployment isn't currently available for this challenge submission, I have created a comprehensive Postman collection (`permit.io.postman_collection.json` in the project repository) that demonstrates the functionality of all API endpoints and the enforced authorization rules. Additionally, the detailed API documentation in the README provides clear request/response examples showcasing the different access control scenarios.

[**Consider including screenshots or a short video demo here if you have one available.** For example, screenshots showing successful requests with proper authorization and 403 Forbidden responses when unauthorized.]

## Project Repo

[https://github.com/TylerMutai/permit.io-auth-challenge](https://github.com/TylerMutai/permit.io-auth-challenge)


Be sure to check out the README.md file in the repository for detailed installation instructions, environment variable setup, and a comprehensive guide to the API endpoints and their authorization mechanisms.

## My Journey

My journey involved several key steps:

1.  **Understanding the Challenge and Permit.io:** I first thoroughly reviewed the challenge requirements and the Permit.io documentation, focusing on API-first authorization principles and the capabilities of both the Cloud and Container PDP. I recognized the importance of showcasing a non-trivial application to highlight Permit.io's potential.

2.  **Choosing the Domain:** I selected document and team management as a practical domain with clear authorization needs. Documents can have different access levels (view, edit, own), and teams involve managing memberships and potentially different roles within the team.

3.  **Setting up the NestJS API:** I scaffolded a NestJS application, implementing user authentication (sign-in) to establish a user context for authorization. I designed the API endpoints for documents and teams, focusing on clear and RESTful conventions.

4.  **Integrating Permit.io:** This was the core of the challenge. I implemented the Permit.io client within the NestJS application to communicate with the PDP. I focused on:
    * **Resource and Action Definitions:** Defining the resource types (document, team) and the actions that can be performed on them (view, create, update, delete, manage\_members).
    * **Attribute Handling:** Implementing logic to fetch relevant user and resource attributes to be passed to Permit.io for ABAC. For example, associating document ownership and team membership with users.
    * **Authorization Checks:** Integrating Permit.io's `check` function within my API endpoint controllers to verify if the authenticated user has the required permission for the requested action on the specific resource.
    * **Error Handling:** Ensuring appropriate 403 Forbidden responses are returned when authorization fails.

5.  **Implementing Attribute-Based Access Control (ABAC):** I specifically chose to use the Container PDP to demonstrate ABAC. This involved thinking about how attributes of users (e.g., roles), resources (e.g., document owners, team members), and potentially the environment could influence authorization decisions defined in Permit.io policies.

6.  **Documentation:** Throughout the development process, I prioritized clear and comprehensive documentation in the README. This included setup instructions, environment variable explanations, detailed API endpoint descriptions with request/response examples, and a clear explanation of how Permit.io is integrated for authorization.

**Challenges and Overcoming Them:**

* **Understanding ABAC with Container PDP:** Initially, grasping the nuances of setting up and querying the Container PDP for ABAC required careful review of the Permit.io documentation. I spent time understanding how to structure attributes and policies to leverage this effectively.
* **Designing Meaningful Policies:** Crafting Permit.io policies that accurately reflected the desired access control logic for documents and teams required some iteration. I focused on creating policies that were both functional and easy to understand.
* **Integrating Permit.io Client:** Ensuring the Permit.io client was correctly initialized and used within the NestJS controllers to perform authorization checks required careful attention to the SDK documentation and examples. I also preferred deploying the permit.io pdp on Cloud Run, which involved combing in deeper into the documentation to further understand how to do this.

**What I Learned:**

* The power and elegance of externalized authorization using tools like Permit.io. It significantly decouples authorization logic from the core application, making it more maintainable and scalable. I didn't have to implement RBAC logic in code, hard-code new permissions in my codebase (which really saved on time, allowing me to focus on logic, and also new deployments everytime a new feature, hence a new permission, is introduced!), and therefore iterations were instant, rather than having to wait for a new deployment to have the changes effected (similar to how feature flags work, which was quite neat-)).
* The benefits of API-first thinking in designing authorization systems. By treating authorization as a fundamental aspect of the API design, it ensures security is baked in from the start.
* The concepts and practical implementation of Attribute-Based Access Control (ABAC) and its potential for fine-grained access control (this was a new concept for me, which took sometime understanding, but was quite fascinating to see in action).

## API-First Authorization

Permit.io was central to building an API-first authorization system in this project. Here's how it was implemented:

* **External Decision Point:** Instead of embedding authorization logic within the NestJS application code (e.g., handling roles and permissions logic within the backend code), all authorization decisions are delegated to the external Permit.io Policy Decision Point (PDP). The API acts as a Policy Enforcement Point (PEP), querying the PDP to determine if a user is authorized to perform a specific action on a resource. 

* **Declarative Policies:** The access control rules for documents and teams are defined declaratively as policies within the Permit.io platform (or would be in a real-world scenario connected to the cloud or a configured Container PDP). These policies specify who can perform which actions on which resources, often based on roles, attributes, and relationships.

* **Centralized Management:** Permit.io provides a centralized platform for managing and auditing authorization policies. This allows for easier updates to access control rules without requiring code changes in the API.

* **Abstraction of Authorization Logic:** The API code remains focused on its core business logic (managing documents and teams). The complexities of authorization are abstracted away and handled by Permit.io. The API simply needs to make authorization requests and enforce the PDP's decisions.

* **Attribute-Based Access Control (ABAC) Implementation:** By utilizing the Container PDP (since ABAC is not supported by the cloud PDP), the project demonstrates ABAC. When an API request is made, the application gathers relevant attributes of the user making the request and the resource being accessed (e.g., the user's ID, the document's owner IDs, the user's team memberships). These attributes are then sent to Permit.io, which evaluates them against the defined ABAC policies to make an authorization decision. For example, I implemented a policy which stated that a user can edit a document if their ID is present in the document's `editors` or `owners` attribute.

In essence, this project treats authorization as a distinct layer that the API interacts with. The API doesn't know nor handle the specific rules and authorization logic; it only knows how to ask Permit.io (which handles the rules and auth logic) if an action is allowed. This aligns perfectly with the principles of API-first authorization, where security is handled through a dedicated and externalized system.
