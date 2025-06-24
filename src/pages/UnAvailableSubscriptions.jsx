import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ban, ArrowLeft } from 'lucide-react';

function SubscriptionUnavailable() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      <Ban className="text-red-600 w-16 h-16 mb-6 animate-pulse" />

      <h1 className="text-3xl sm:text-4xl font-bold mb-4">
        Subscriptions Are Currently Unavailable
      </h1>

      <p className="text-gray-400 text-base sm:text-lg max-w-md mb-8">
        We're working on improving our plans and pricing. Please check back soon for exciting updates.
      </p>

      <button
        onClick={() => navigate('/account')}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded text-sm font-semibold cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Accounts
      </button>
    </div>
  );
}

export default SubscriptionUnavailable;
