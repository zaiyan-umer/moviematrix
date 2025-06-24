import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

function MovieNotAvailable() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4 text-center">
      <AlertTriangle className="w-16 h-16 text-yellow-400 mb-4" />
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Movie Not Available</h1>
      <p className="text-gray-400 mb-6">
        The movie you're looking for doesn't exist or couldn't be loaded.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 cursor-pointer rounded font-semibold transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Go Back
      </button>
    </div>
  );
}

export default MovieNotAvailable;
