import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  orderId: string;
  paymentId: string;
  signature: string;
  amount: number;
  currency: string;
  status: 'created' | 'paid' | 'failed';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    orderId: { type: String, required: true, unique: true },
    paymentId: { type: String, required: true, unique: true },
    signature: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'INR' },
    status: {
      type: String,
      enum: ['created', 'paid', 'failed'],
      default: 'created',
    },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPayment>('Payment', PaymentSchema); 