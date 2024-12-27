# Payload CMS with SQLite and Team Management

A Payload CMS application demonstrating user management with team filtering capabilities implemented using a custom component.

Also demonstrates how to access the database directly using Drizzle ORM.

## VIDEO
- [youtu.be/W_Da3Sp4Lgw](https://youtu.be/W_Da3Sp4Lgw)

## Features

- **Database**: SQLite with Drizzle ORM
- **Storage**: Local disk storage
- **User Management**:
  - Users can be assigned to teams
  - Team-based filtering in admin UI
  - Custom admin components for user list view

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Generate database schema:
   This MUST be done to generate the types for drizzle ORM so we can do typed queries.

```bash
npx payload generate:db-schema
```

3. Run the development server:

```bash
npm run dev
```

4. Access the admin UI at `http://localhost:3000/admin`

5. Create users and assign them to teams

6. Filter users by team in the admin UI

7. Use the custom component to filter users by team in the user list view
