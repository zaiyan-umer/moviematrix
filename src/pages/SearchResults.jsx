import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios/axios';
import Navbar from '../components/Navbar';
import { ArrowLeft } from 'lucide-react';
import MovieCard from '../components/MovieCard';

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        const { data } = await axios.get(
          `/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US`
        );
        setResults(data.results || []);
      } catch (err) {
        console.error('Search failed:', err.message);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-0">
      <Navbar isLoggedIn />
      <div className="max-w-6xl mx-auto py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center cursor-pointer text-gray-300 hover:text-white transition duration-150"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>

        <h1 className="text-3xl font-bold mb-8">
          Search Results for "{query}"
        </h1>

        {results.length === 0 ? (
          <p className="text-gray-400 text-lg text-center mt-20">
            No results found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {results.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>

        )}
      </div>
    </div>
  );
}

export default SearchResults;
