import { Router } from 'express';
import { body } from 'express-validator';
import { createOrder, verifyPayment } from '../controllers/payment.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Validation middleware
const createOrderValidation = [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('currency').optional().isString().isLength({ min: 3, max: 3 }).withMessage('Currency must be a 3-letter code'),
];

const verifyPaymentValidation = [
  body('razorpay_order_id').notEmpty().withMessage('Order ID is required'),
  body('razorpay_payment_id').notEmpty().withMessage('Payment ID is required'),
  body('razorpay_signature').notEmpty().withMessage('Signature is required'),
];

// Routes
router.post('/create-order', createOrderValidation, createOrder);
router.post('/verify', authenticate, verifyPaymentValidation, verifyPayment);

export default router; 