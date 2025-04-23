
# Library Management System

This project is a **Library Management System** developed as part of a test assignment for **Acxiom Consulting**. It is a web-based application built using React.js that allows admins and users to manage library resources efficiently. The system includes role-based access control, ensuring secure and seamless functionality.

## Demo




https://github.com/user-attachments/assets/81e4880b-fb30-480f-9edd-7a1264c318a9





---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Folder Structure](#folder-structure)


---

## Overview

The Library Management System provides a robust solution for managing books, movies, memberships, and transactions within a library. It includes role-based access control, ensuring that admins and users have access to only the features relevant to their roles.

---

## Features

### Admin Features
- **Maintenance**:
  - Add, update, and manage memberships, books, movies, and user accounts.
- **Reports**:
  - Generate reports on books, movies, memberships, active issues, overdue returns, and pending requests.
- **Transactions**:
  - Issue books, return books, and manage fines.

### User Features
- **Reports**:
  - View reports on books, movies, and memberships.
- **Transactions**:
  - Check book availability, issue books, return books, and pay fines.

### General Features
- Role-based access control.
- Secure login system with predefined credentials.
- Reusable "Go Back" button for seamless navigation.
- Clean and professional design with consistent styling.

---

## Installation

To run the application locally, follow these simple steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/library-management-system.git
   cd library-management-system
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Application**:
   ```bash
   npm start
   ```

4. **Open in Browser**:
   - Once the development server starts, navigate to [http://localhost:3000](http://localhost:3000) in your browser.

That's it! The app will now be up and running.

---

## Usage

### Login Credentials
- **Admin**:
  - Username: `adm`
  - Password: `admin123`
- **User**:
  - Username: `user`
  - Password: `user123`


---

## Folder Structure

```
library-management-system/
├── public/               # Public assets (e.g., favicon, logo)
├── src/
│   ├── components/       # Reusable components (e.g., Header, BackButton)
│   ├── pages/            # Pages for different modules (e.g., Login, Reports, Transactions)
│   ├── App.js            # Main application component
│   ├── index.js          # Entry point of the application
│   ├── global.css        # Global styles for the application
├── package.json          # Project dependencies
├── README.md             # This file
```

---





