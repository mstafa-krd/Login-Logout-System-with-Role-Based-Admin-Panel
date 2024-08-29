# Fullstack Authentication System with Role-Based Access Control

## Overview

This project is a fullstack application with an authentication system and role-based access control. It includes login/logout functionality, an admin panel with four user roles (Super Admin, Admin, Manager, Normal User), team management, and task assignment features.

## Features

- **User Authentication:** Login and logout functionality.
- **Role-Based Access Control:** Four user roles with different access levels.
- **Admin Panel:** Manage users, teams, and tasks.
- **Team Management:** View and manage team members and tasks.

## Setup Process

### Prerequisites

- Node.js and npm/yarn
- Database (MongoDB)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [[repository-url]](https://github.com/mstafa-krd/Login-Logout-System-with-Role-Based-Admin-Panel.git)
   ```

2. **Navigate to the project directory:**
   
   for the frontend
   ```bash
   cd BackEnd  for the Backend
   ```
   for the Backend
    ```bash
   cd BackEnd  
   ```

4. **Install dependencies:**
 Run the following command to install all required libraries and packages listed in the package.json file:
   ```bash
   npm install
   ```

5. **Run the application:**
   ```bash
   npm run dev
   ```

6. **Run tests:**
   ```bash
   npm test
   ```
   
- **Runnig the Frontend server:** you should start from **"/login"** route since theres not need for the home page with "/" route

## Configuration

- **Environment Variables:** Create a `.env` file with the following variables:
  ```env
  PORT = 4000
  MONGODB_PASSWORD = <Enter the mongoDB password here>
  SESSION_SECRET = "hAEoYZFYD3XERoEnFhDRHuzOYscVm6yZhzwLBg43thGq31RVcm"

  ```

## Role-Based Access Control Implementation

### Roles

- **Super Admin:** Full access to all features, including adding or changing other Super Admins and Admins.
- **Admin:** Full access to all features except adding new Super Admins or changing the information of existing Super Admins.
- **Manager:** Can view their team members, add new team members, view their team’s tasks, and add tasks.
- **Normal User:** Can see their team and view their own tasks.

### Implementation

- **Backend:** Middleware checks user roles before allowing access to protected routes.
- **Frontend:** Conditional rendering of components based on user role.

## Testing

### Unit Tests

- **Authentication:** Tests for login and logout functionality.
- **Authorization:** Tests for role-based access to various features.
- **UI Components:** Tests for rendering based on user role.



## Documentation

### Codebase

- **Setup Instructions:** Follow the steps in the "Installation" section.
- **Role-Based Access Control:** Refer to the "Role-Based Access Control Implementation" section.

### User Manual

#### Managing Users


1. **Add New User:**
   - Navigate to the "Dashboard" .
   - Click "Add New User."
   - Fill in user details and select a role .
   - Click "Add new user."

2. **Edit User:**
   - Select a user from the list.
   - Click the icon.
   - Update user details or change the role if needed.
   - Click "update."

3. **Delete User:**
   - Select the user you want to delete.
   - Click the delete icon.

#### Managing Teams


1. **View Team Members:**
   - Select the team to view its members.
   - Access member details and tasks.

#### Managing Tasks

1. **Add New Task:**
   - Navigate to the "Tasks" tab.
   - Select  "Add New Task."
   - Enter task details and assign it to a member.
   - Click "Add."



### Role-Based Access

- **Super Admin:** Can do everything, including managing Super Admins and Admins.
- **Admin:** Can do everything except add or modify Super Admins.
- **Manager:** Can view and manage team members and tasks within their team.
- **Normal User:** Can see their team and view their own tasks.
