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


## Modules

### Authentification
The authentication module handles user login, registration, and session management within the application. It ensures that users can securely access their accounts, providing necessary checks for user credentials, managing session tokens, and enforcing authentication throughout the app. This module typically includes functions for logging in, logging out, registering new users, and verifying user sessions.

#### src>app>auth>signup:
- page.tsx (UI sign up page)
- NameValidation.tsx (Name must be in Firstname Lastname format)
- EmailValidation.tsx (Email must be in example@email.com)
- PasswordValidation.tsx (Password must be 8+ characters)
- IsChecked.tsx (Check if email already in use or not)

#### src>app>auth>signin:
- page.tsx (UI sign in page)
- EmailValidation.tsx (Check if email exists)
- PasswordValidation.tsx (Check if password correct)

#### Backend:
- Controller: backend/controllers/users.controller.js
- Model: backend/models/users.model.js
- Route: backend/routes/users.route.js
- Middleware: backend/middleware/authJwt.js & backend/middlewsare/verifySignup.js

### Calendar
The calendar module allows transporters to set up and manage their trips. It provides an intuitive interface for transporters to schedule new trips, view existing ones, and make necessary changes. This module ensures that all trip details are accurately recorded and easily accessible, enabling efficient trip management.

#### src>components>Calendar:
- index.tsx (UI calendar page)
- AddTripModal.tsx (Modal that appears when a cell of the calendar is clicked, has different input forms)
- DatePickerOne.tsx (Input form for the date of departure)
- DatePickerTwo.tsx (Input form for the date of arrival)
- SelectCountry (Input form for countries and states of departure & arrival, uses API to fetch all countries & states)

index.tsx also includes input forms for the maximum trip's weight, and trip description. They were included in the main UI page due to their simplicity.

### Trips
The trips module is focused on viewing current trips available to clients and transporters. It provides an interface for users to browse through the list of ongoing and upcoming trips, view trip details, and send offers to trips (by clients). This module ensures that all trip information is presented clearly and is easily accessible to users.

#### src>app>trips>current-trips:
- page.tsx (UI current trips page, the transporter can start/end trips which changes the trip's status and sends a notification to users who sent offers to that particular trip)
- UpdateTripModal.tsx (When the update button is clicked, a modal appears that allows transporters to update their trip)
- DatepickerOne.tsx (Allows transporter to change the trip's departure date)
- DatepickerTwo.tsx (Allows transporter to change the trip's arrival date)
- ReadTripModal.tsx (Allows user to view trip's description)
- SelectCountry.tsx (Allows transporter to change the trip's destination)

This page is available for transporters, it allows them to view/update their trips.

#### src>app>trips>find-trips:
- page.tsx (UI find trips page, allows client to send offers to trips)
- Filter.tsx (Allows clients to filter through the available trips)
- SelectDepCountry.tsx (Input form for the country of departure for the filter)
- SelectDestCountry.tsx (Input form for the country of destination for the filter)
- DatePicker.tsx (Input form for the date of trip for the filter)
- ReadTripModal.tsx (Allows user to view trip's description)

This page is available for clients, it allows them to view the available trips and send them offers.

#### Backend:
- Controller: backend/controllers/trips.controller.js & backend/controllers/events.controller.js
- Model: backend/models/trips.model.js & backend/models/events.model.js
- Route: backend/routes/trips.route.js & backend/routes/events.route.js

### Offers
The offers module is responsible for managing and displaying the offers sent by clients to transporters. It allows transporters to view, accept, or decline offers from clients and clients to view their own offers sent, with the ability to delete them.

#### src>app>apply-trip:
- page.tsx (When a trip is picked in find-trips by the client, they are redirected to this page where they fill out a form with information about the package such as name, dimensions, optional photo)

#### src>app>offers:
- page.tsx (Allows transporters to view the offers they received for their trips, they can either accept or deny the offer, in the case where the package's weight exceeds the trip's weight, transporter has no choice but to reject the offer)

This page is available for transporters, it allows them to respond to offers.

#### src>app>offers>view-offers:
- page.tsx (Allows clients to view their own offers, if the offer either 1. hasn't been accepted by the transporter yet OR 2. rejected by the transporter the client has the ability to delete the offer, if the package was delivered by the transporter the client can confirm the delivery. When an offer is sent the concerned transporter receives a notification)

This page is available for clients, it allows them to delete, or confirm offers.

#### Backend:
- Controller: backend/controllers/offers.controller.js
- Model: backend/models/offers.model.js
- Route: backend/routes/offers.route.js

### Chat & Notifications
The chat system module enables real-time communication between clients and transporters. It provides an interface for sending and receiving messages, this module handles the setup of real-time connections, message delivery, storage of chat history and message notifications.

#### src>app>chat:
- page.tsx (Contains chat system UI, and socket logic to send/receive messages and notifications in real time)

### Socket (For Chat & Notifications)
The socket module is responsible for enabling real-time communication and data transfer between the client and the server. It plays a crucial role in supporting features such as live chat, instant notifications, and real-time updates throughout the application.

#### src>app>context:
- SocketContext.tsx (Fetches data of online users)

#### src:
- layout.tsx (Socket Context is executed in this page, if any user accesses any page of our application, he is added to the online users list)

#### Backend (For Chat System):
- Controller: backend/controllers/chats.controller.js & backend/controllers/messages.controller.js & backend/controllers/notifications.controller.js
- Model: backend/models/chats.model.js & backend/models/messages.model.js & backend/models/notifications.model.js
- Route: backend/routes/chats.route.js & backend/routes/messages.route.js & backend/routes/notifications.route.js

- #### Backend (For Regular Notifications):
- Controller: backend/controllers/bellnotifications.controller.js
- Model: backend/models/bellnotifications.model.js
- Route: backend/routes/bellnotifications.route.js


