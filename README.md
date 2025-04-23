# Legal Compass AI - Razorpay Integration

This project implements a complete Razorpay payment integration for the Legal Compass AI application using React with TypeScript on the frontend and Node.js + Express on the backend.

## Features

- Secure payment processing with Razorpay
- Frontend payment flow with React and TypeScript
- Backend API for order creation and payment verification
- MongoDB integration for payment records
- Environment variable configuration
- Error handling and validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Razorpay account with API keys

## Setup

1. Clone the repository
2. Install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ..
npm install
```

3. Configure environment variables:

Create `.env` files in both frontend and backend directories:

Backend (.env):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/legal-compass-ai
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Frontend (.env):
```
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_API_URL=http://localhost:5000/api
```

4. Start the development servers:

```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in a new terminal)
cd ..
npm run dev
```

## Usage

1. Navigate to the payment page
2. Click the "Pay" button
3. Complete the payment using Razorpay checkout
4. Handle success/failure callbacks

## API Endpoints

### Create Order
- POST `/api/payments/create-order`
- Body: `{ amount: number }`
- Returns: `{ orderId: string, amount: number, currency: string }`

### Verify Payment
- POST `/api/payments/verify`
- Body: `{ orderId: string, paymentId: string, signature: string }`
- Returns: `{ success: boolean, message: string }`

## Security Considerations

- Never expose Razorpay secret key in frontend code
- Always verify payments on the backend
- Use environment variables for sensitive data
- Implement proper error handling
- Validate all input data

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
