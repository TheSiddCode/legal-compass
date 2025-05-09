import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import { log } from 'console';
dotenv.config();

let razorpay: Razorpay | null = null;

// Initialize Razorpay only if credentials are available
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

export const createOrder = async (req: Request, res: Response) => {
  try {
    if (!razorpay) {
      return res.status(503).json({ message: 'Payment service not available' });
    }
    
    const { amount, currency = 'INR' } = req.body;
    //console.log('User ID:', req.user);
    const userId = await req.user?._id; // Using _id instead of id for MongoDB documents
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const options = {
      amount: amount * 100,
      currency,
      receipt: `rcpt_${Date.now().toString().slice(-8)}_${userId.toString().slice(-4)}`,
    };

    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).json({ message: 'Failed to create order' });
    }
    res.json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    if (!razorpay) {
      return res.status(503).json({ message: 'Payment service not available' });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.user?._id; // Using _id instead of id for MongoDB documents

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Verify payment signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = require('crypto')
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      res.json({ message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ message: 'Failed to verify payment' });
  }
}; 