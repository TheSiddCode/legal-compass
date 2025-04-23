import React, { useState } from 'react';
import PaymentButton from './PaymentButton';
import { toast } from 'react-hot-toast';

const PaymentPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentSuccess = (response: any) => {
    setIsProcessing(false);
    toast.success('Payment successful!');
    console.log('Payment successful:', response);
    // Handle successful payment (e.g., update UI, redirect, etc.)
  };

  const handlePaymentFailure = (error: any) => {
    setIsProcessing(false);
    toast.error('Payment failed: ' + error.message);
    console.error('Payment failed:', error);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Complete Your Payment</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        <div className="bg-gray-50 p-4 rounded">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Service</span>
            <span className="font-medium">Legal Compass AI Premium</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium">1 Month</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span>₹999</span>
          </div>
        </div>
      </div>

      <PaymentButton
        amount={999}
        onSuccess={handlePaymentSuccess}
        onFailure={handlePaymentFailure}
      />

      {isProcessing && (
        <div className="mt-4 text-center text-gray-600">
          Processing payment...
        </div>
      )}
    </div>
  );
};

export default PaymentPage; 