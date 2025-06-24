import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center px-4">
      <h1 className="text-7xl font-extrabold text-red-600">404</h1>
      <h2 className="text-3xl mt-4 font-bold">Lost in the stream?</h2>
      <p className="text-lg text-gray-400 mt-2 max-w-md">
        The page you're looking for isn't available. But the shows are still fire 🔥
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
