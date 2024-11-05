# scotia-technical-test

## Overview

This project is designed using the API First approach combined with the MVC (Model-View-Controller) architecture. This design choice promotes a clear separation of concerns, making the application more maintainable and scalable. The API First approach ensures that the API is the primary interface for interaction, allowing frontend and backend teams to work in parallel, while the MVC structure simplifies the development of both the frontend and backend components.

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

- Ensure you have Docker and Docker Compose installed on your machine.

### Steps to Run the Project

1. **Set Up the Database Environment:**
   - Navigate to the root directory of the project.
   - Run the following command to create the PostgreSQL database environment:

     ```bash
     docker-compose up -d
     ```

2. **Open the Backend Project:**
   - Open your backend project in your preferred IDE.

3. **Build the Backend:**
   - Run the following command to build the backend project with Gradle:

     ```bash
     ./gradlew build
     ```

   - This step will trigger Flyway to generate the database with the necessary versioning.
   - This also trigger openApiGenerate to create the necesary code to work properly.

4. **Run the Backend:**
   - Start the backend application. You can do this through your IDE or by executing the appropriate command in the terminal.

5. **Open the Frontend Project:**
   - Open your frontend project in your preferred IDE.

6. **Install Frontend Dependencies:**
   - Navigate to the frontend project directory and run:

     ```bash
     npm install
     ```

7. **Run the Frontend:**
   - After installing the dependencies, start the frontend application by running:

     ```bash
     npm start
     ```

### Why API First and MVC?

- **API First:** 
  - This approach allows for better collaboration between frontend and backend teams by defining the API contracts upfront. It leads to cleaner interfaces, improved documentation, and ensures that the backend services are designed to meet the needs of the frontend, enhancing the overall development experience.

- **MVC Pattern:**
  - The MVC architecture provides a structured way to separate concerns, making it easier to manage the codebase. 
  - **Model:** Handles the data and business logic.
  - **View:** Manages the presentation layer and user interface.
  - **Controller:** Acts as an intermediary between the Model and View, processing user input and updating the Model and View accordingly.

This separation allows for easier testing, debugging, and future enhancements, making it an ideal choice for designing non-large services.

## Conclusion

By following these steps, you will set up and run the project successfully. The combination of API First and MVC provides a robust framework for building scalable and maintainable applications.
