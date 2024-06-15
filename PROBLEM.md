# **AnswersAi Backend Technical Assessment**

### Objective

The objective of this assignment is to assess your Backend development skills, problem-solving abilities, and code quality. You will be creating a secure and scalable backend service built on Node.js and Express.js. Similar to a minimal version of AnswersAi, this service will take in user requests and handle questions. This is designed to be used with a frontend application - and while you do not need to build any frontend, please keep this in mind while designing this service.

This assignment has been designed to be doable within 4-5 hours. You will have **5 days** from when you receive the email to submit this assignment. If you need more time, please email [siddhant@answersai.ai](mailto:siddhant@answersai.ai) to request an extension.

You do not need to complete 100% of task requirements. Please complete as much as you can within the 5-day timeline - we value speed over perfection.

### Requirements

1. Design a RESTful API using Node.js and Express.js with the following endpoints:
    - **POST /api/questions**
        - Accept user question, and return AI-generated answer.
    - **GET /api/questions/:questionId**
        - Retrieve specific question and answer by question ID.
    - **POST /api/users**
        - Create a new user account.
    - **GET /api/users/:userId**
        - Retrieve a user profile with a given userId
    - **GET /api/users/:userId/questions**
        - Retrieve all questions asked by user with a given userId
    
2. Implement authentication and authorization using JWT tokens or similar for API security.
    - **POST /api/auth/login:** User login endpoint.
    - **POST /api/auth/logout:** User logout endpoint.
    - **POST /api/auth/refresh:** Refresh access token endpoint.
    
3. Design and implement a database schema for questions and users.
    1. **Ensure that this is scalable, and be prepared to explain your design choice (relation vs non-relational, ACID guarantees, etc).**
    2. Keep in mind that this service will scale to hundreds of thousands of users who might use it concurrently. 
    3. Optional: Use an ORM (such as Sequelize or Knex.js).
    
4. Integrate with an AI service (e.g. OpenAI API) to generate answers. Use secure libraries/SDKs for API calls. We recommend [langchain](https://python.langchain.com/docs/integrations/llms/openai/).
    1. Keep in mind that this service will scale to hundreds of thousands of users who might use it concurrently. 
    2. **Please document a solution (no need to code it) that ensures that users get timely responses even during periods of high load.**
    
5. Containerize the application using Docker. Provide a Dockerfile for easy deployment.
    
    
6. Design a scalable infrastructure on AWS or GCP (EC2, RDS, ELB, ECS, Auto Scaling, etc.). **Provide an architecture diagram or description.**
    1. **You do not need to deploy to the cloud.** Simply provide an architecture diagram (using software like Lucidchart or on pen and paper), or a written description.
    
7. Write unit tests for critical components (API endpoints, database interactions) using Jest, Mocha, or similar libraries.
    
    
8. Provide a README with setup and running instructions, including dockerfile setup and running instructions, database setup, environment variables, and dependencies.

### Evaluation Criteria

Your assignment will be evaluated based on the following criteria:

- API Design and Implementation (20%):
    - Proper design and structure of API endpoints
    - Adherence to RESTful principles
    - Appropriate use of HTTP methods and status codes
    - Clear and consistent API documentation
- Database Design and Interaction (20%):
    - Proper database schema design
    - Appropriate use of data types and constraints
    - Efficient and optimized database queries
    - Proper handling of database interactions (CRUD operations)
- Authentication and Authorization (15%):
    - Secure implementation of user authentication using JWT tokens
    - Proper handling of token creation, verification, and expiration
    - Secure storage and handling of sensitive information (e.g., passwords)
- Code Quality and Best Practices (15%):
    - Adherence to coding best practices and conventions
    - Proper code organization and modularization
    - Appropriate use of error handling and logging
    - Efficient and optimized code implementation
- Integration with AI Service (10%):
    - Successful integration with the chosen AI service (e.g., OpenAI API)
    - Proper handling of API requests and responses
    - Efficient and secure communication with the AI service
- Containerization and Deployment (10%):
    - Proper containerization of the application using Docker
    - Provision of clear and concise Dockerfile and related configurations
    - Successful deployment of the containerized application
- Testing and Documentation (10%):
    - Implementation of unit tests for critical components
    - Adequate test coverage and test quality
    - Clear and comprehensive documentation (README, API docs, etc.)
    - Inclusion of setup and deployment instructions

### Notes

1. LLM APIs:
    1. If you’re unfamiliar with the OpenAI API, you can refer to documentation on how to integrate OpenAi’s API with Node.js. We recommend using [langchain](https://python.langchain.com/docs/integrations/llms/openai/). Keep in mind that OpenAI might require you to pay to use their API. 
    2. If you would like to use a free API, then feel free to use Anthropic’s API - they provide $5 in free credits. You can use [langchain](https://python.langchain.com/docs/integrations/chat/anthropic/) to integrate Anthropic’s models too.
    3. **You will not be judged on the quality of API responses, so feel free to use whichever model works best for you. The main goal is to integrate the backend service with an LLM API.**
2. API Requirements:
    1. Please ensure that only authenticated users are able to ask questions and get a response.
        1. In other words, if using JWT authentication, ensure that every request to the /api/questions endpoint includes a header similar to:
        
        ```sql
        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
        ```
        
3. Design
    1. Please implement architecture with scalability in mind.
    2. You will be asked to explain your design choices.
4. **User signup flow**
    1. POST /api/users → POST /api/auth/login → POST /api/questions (with JWT token)
5. Sample database schema (Please feel free to design your own - this is a minimal schema just for reference and is not comprehensive by design):
    
    ```sql
    
    CREATE TABLE users (
      id VARCHAR(255) PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE questions (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
    ```
    
6. You do not need to implement any functionality for images, videos, etc. The only way the user will interact with the app is through text.
7. Feel free to use online resources, however, be prepared to explain why you used what you did. 

### Submission Instructions

Please submit your assignment by following these steps:

1. Create a new GitHub repository for your completed service.
    1. Name the repository FIRSTNAME-LASTNAME-AnswersAi-Backend. For example, if my name is Jane Doe, the repository will be named Jane-Doe-AnswersAi-Backend.
    2. Ensure that this Github repository is public.
2. Push your completed backend service to the GitHub repository on the main branch.
3. Include the README file and any necessary instructions and configurations in the repository (e.g. initializing docker, database, env files, etc.)
4. Create a 2-minute demo video of you showing the functionality of your backend service.
5. Submit the GitHub repository link, link to Demo Video, and your architecture diagram on [this form.](https://forms.gle/REqFAA8tPdrXmRtAA)

### Deadline

This assignment has been designed to be doable within 4-5 hours. You will have **5 days** from when you receive the email to submit this assignment. If you need more time, please email [siddhant@answersai.ai](mailto:siddhant@answersai.ai) to request an extension.

If you have any questions or need further clarification, please don't hesitate to reach out at siddhant@answersai.ai. We look forward to reviewing your submission. Good luck!