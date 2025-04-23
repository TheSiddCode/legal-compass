import Razorpay from 'razorpay';
import crypto from 'crypto';
import Payment from '../models/Payment';

class RazorpayService {
  private razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
  }

  async createOrder(amount: number, currency: string = 'INR') {
    try {
      const order = await this.razorpay.orders.create({
        amount: amount * 100, // Convert to paise
        currency,
        receipt: `receipt_${Date.now()}`,
      });

      return order;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw error;
    }
  }

  async verifyPayment(
    orderId: string,
    paymentId: string,
    signature: string,
    userId: string
  ) {
    try {
      const body = orderId + '|' + paymentId;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(body)
        .digest('hex');

      const isValid = expectedSignature === signature;

      if (isValid) {
        // Update payment status in database
        await Payment.findOneAndUpdate(
          { orderId },
          {
            paymentId,
            signature,
            status: 'paid',
          }
        );

        return true;
      }

      return false;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  }

  async createPaymentRecord(
    orderId: string,
    amount: number,
    userId: string,
    currency: string = 'INR'
  ) {
    try {
      const payment = new Payment({
        orderId,
        amount,
        currency,
        userId,
        status: 'created',
      });

      await payment.save();
      return payment;
    } catch (error) {
      console.error('Error creating payment record:', error);
      throw error;
    }
  }
}

export default new RazorpayService(); 