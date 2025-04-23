import React from 'react';
import { Button } from './ui/button';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentButtonProps {
  amount: number;
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  onSuccess,
  onFailure,
}) => {
  console.log('PaymentButton rendered with amount:', amount);
  
  const handlePayment = async () => {
    try {
      // Create order on the backend
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      console.log(response);
      
      const order = await response.json();

      if (!response.ok) {
        throw new Error(order.error || 'Failed to create order');
      }

      // Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Legal Compass AI',
        description: 'Payment for Legal Compass AI Services',
        order_id: order.orderId,
        handler: async (response: any) => {
          try {
            // Verify payment on the backend
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId: order.orderId,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });

            const verificationResult = await verifyResponse.json();

            if (verificationResult.success) {
              onSuccess(response);
            } else {
              onFailure(new Error('Payment verification failed'));
            }
          } catch (error) {
            onFailure(error);
          }
        },
        prefill: {
          name: 'User Name', // You can get this from your user context
          email: 'user@example.com', // You can get this from your user context
        },
        theme: {
          color: '#2563eb',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      onFailure(error);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
    >
      Pay ₹{amount}
    </Button>
  );
};

export default PaymentButton; 