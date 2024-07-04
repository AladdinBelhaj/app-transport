# app-transport
app-transport is a web-based application designed to facilitate the connection between clients who need transportation services and transporters who offer these services. The platform allows transporters to offer transport services, and clients to request these services.
## Overview


### Key Features
- User authentication and authorization
- Client and transporter profiles
- Real time chat between clients and transporters
- Real time notifications
- **Reactive Calendar:** Transporters can set up and manage dates of their trips using a responsive and interactive calendar.
- **Client Offers:** Clients can send offers for available trips.
- **Offer Management:** Transporters can accept or deny offers made by clients.

## Getting Started

### Prerequisites
- Node.js (v14.x or later)
- npm (v6.x or later)
- MySQl (v6.x or later)
  
### Installation
1. Clone the repository:
   ```bash
   git clone git@github.com:AladdinBelhaj/app-transport.git

2. Navigate to project directory:
   ```bash
   cd app-transport

3. Install dependencies
      ```bash
   npm install

### Usage

1. To start the backend server, run:
   ```bash
   cd app-transport/backend
   nodemon server.js
   
2. To start the socket, run:
   ```bash
   cd app-transport/backend/socket
   nodemon index.js

3. To start the development server, run:
   ```bash
   cd app-transport/backend/socket
   npm run dev

The application will be available at http://localhost:3000.

### 4. API Documentation

**Example:**
```markdown
## API Documentation

### Endpoints

#### Create a Task
- **URL:** `/api/tasks`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "assignedTo": "userId"
  }
