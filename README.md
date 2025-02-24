



1. Clone the repository:
   ```sh
   git clone https://github.com/vasanth27s/vk-medi.git
   ```
2. Install dependencies:
   ```sh
   npm install
   
4. Start the backend server:
   ```sh
   npm start
   ```
   The backend will run at `http://localhost:8080`.

### Frontend Setup

1. Navigate to the frontend directory in a new terminal:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm run dev
   ```
   The frontend will run at `http://localhost:5173`.

---

## Running the Application

1. Start the backend (`npm start` in `backend` directory).
2. Start the frontend (`npm run dev` in `frontend` directory).
3. Open `http://localhost:5173` in the browser to use the application.

---





### Doctors

- `GET /api/doctors` 
- `GET /api/doctors/:id` 
- `GET /doctors/:id/slots?date=YYYY-MM-DD`

---
### Appointments

- `POST /api/appointments` - Book an appointment
- `GET /api/appointments` - Get all appointments
- `PUT /api/appointments/:id` - Update an appointment
- `DELETE /api/appointments/:id` - Cancel an appointment



