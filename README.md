# Prayer Times

## Overview

The Prayer Times Backend is a robust API built with GraphQL, TypeScript, PostgreSQL, and Prisma. This backend provides accurate and up-to-date prayer times data to clients or frontend applications, supporting seamless integration via GraphQL queries and mutations. It is designed with scalability and maintainability in mind, enabling developers to easily fetch, filter, and manage prayer times.

## Features

### GraphQL API:

  - Provides queries to retrieve prayer times for specific locations and dates.

  - Supports mutations for adding or updating prayer time records.

  - Offers flexible filtering and sorting options for clients.


### Type Safety:

 - Built with TypeScript for type safety and robust application logic.

 - Ensures consistent data structures between database and API.


### Database Management:

 - Uses PostgreSQL as the primary database for reliable storage.

 - Prisma ORM handles database interactions with an easy-to-use schema.

 - Scalable and Maintainable:

 - Designed to be extended with additional features like notifications, multiple locations, or user preferences.

 - Structured for production readiness with clear modular code.

### Technologies Used

 - GraphQL: API query language for efficient and flexible data fetching.

 - TypeScript: Provides type safety and better code maintainability.

 - PostgreSQL: Relational database for storing prayer times securely.

 - Prisma: ORM for database schema management and simplified queries.

## Getting Started for Backend

**1. Clone the frontend repository:**
```bash
git clone <Repo URL>
cd <repo-folder>
```
**2. Install dependencies:**
```bash
npm install
```

**3. Configure the environment:**
  - Create a .env file with your PostgreSQL connection details.
  - Example:
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/prayertimes
```

**4. Run database migrations:**
```bash
npx prisma migrate dev
```

**5. Start the development server:**
```bash
npm run dev
```

**6. Access the backend locally:**
    http://localhost:4000

## Getting Started for Frontend

**1. Clone the frontend repository:**
```bash
git clone <Repo URL>
cd <repo-folder>
```
**2. Install dependencies:**
```bash
npm install
```

**3. Start the development server:**
```bash
npm run dev
```

**4. Access the frontend locally:**
    http://localhost:5137

## 📞 Contact

For any inquiries or issues, feel free to reach out:

- **Email:** [arif.aust.eng@gmail.com](mailto:arif.aust.eng@gmail.com)
- **LinkedIn:** [Md. Arifur Rahman](https://www.linkedin.com/in/engarif3/)

#### Click below for the project live link:

[Prayer Times](https://prayer-times-psi.vercel.app/) 
