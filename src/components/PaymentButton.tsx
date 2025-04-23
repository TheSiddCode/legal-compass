import React from 'react';
import { useEffect, useState } from 'react';
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
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  console.log('PaymentButton rendered with amount:', amount);

  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => setIsScriptLoaded(true);
      document.body.appendChild(script);
    };

    if (!window.Razorpay) {
      loadRazorpayScript();
    } else {
      setIsScriptLoaded(true);
    }

    return () => {
      // Cleanup script when component unmounts
      const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePayment = async () => {
    if (!isScriptLoaded) {
      onFailure(new Error('Razorpay SDK is not loaded yet'));
      return;
    }

    try {
      // Create order on the backend
      const response = await fetch('http://localhost:5001/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
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
            const verifyResponse = await fetch('http://localhost:5001/api/payments/verify', {
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
      disabled={!isScriptLoaded}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
    >
      Pay ₹{amount}
    </Button>
  );
};

export default PaymentButton; 