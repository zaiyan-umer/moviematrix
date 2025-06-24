import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
    const { favorites } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <>
            <div className="min-h-screen bg-black text-white px-4 py-0">
                <Navbar isLoggedIn />
                <div className="max-w-6xl mx-auto py-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-4 flex items-center cursor-pointer text-gray-300 hover:text-white transition duration-150"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back
                    </button>
                    <h1 className="text-3xl font-bold mb-8">My Favorites</h1>

                    {favorites.length === 0 ? (
                        <p className="text-gray-400 text-lg text-center mt-20">
                            You haven't added any favorites yet.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {favorites.map((movie, index) => (
                                <MovieCard
                                    key={index}
                                    movie={movie}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Favorites;
