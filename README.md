# Backend Setup

This backend is prepared for saving trip form data to MongoDB.

## 1. Install dependencies

```bash
npm install
```

## 2. Create env file

Copy `.env.example` to `.env` and add your MongoDB connection string:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
MONGODB_DB_NAME=travellers
CLIENT_URL=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@example.com
SMTP_PASS=your_app_password
EMAIL_FROM="WanderNest <your_email@example.com>"
```

## 3. Run backend

```bash
npm run dev
```

## API

### Health check

`GET /api/health`

### Save trip request

`POST /api/trip-requests`

Example body:

```json
{
  "mail": "traveller@example.com",
  "destination": "Goa",
  "members": 4,
  "travellers": [
    { "name": "Aman", "age": 26 },
    { "name": "Riya", "age": 24 },
    { "name": "Karan", "age": 28 },
    { "name": "Neha", "age": 25 }
  ],
  "days": 5,
  "budget": 40000
}
```

When SMTP settings are added, the backend also sends this confirmation email after save:

`Your req has been submitted. We will update you shortly.`

### Get saved trip requests

`GET /api/trip-requests`
