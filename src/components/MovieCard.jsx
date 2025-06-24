import { Heart } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const base_url = 'https://image.tmdb.org/t/p/w342';

function MovieCard({ movie, isRow = false }) {
    const { toggleFavorite, isFavorited } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    const imagePath = isRow ? movie.backdrop_path : movie.poster_path;

    if (!imagePath) return null;

    return (
        <div className="w-full">
            <div
                className={`relative group cursor-pointer transition-transform hover:scale-105 ${isRow ? 'min-w-[280px]' : 'min-w-[180px]'
                    }`}
                onClick={() => handleClick(movie.id)}
            >
                <img
                    loading="lazy"
                    src={`${base_url}${imagePath}`}
                    alt={movie.title || movie.name}
                    className={`w-full object-cover transition-all duration-200 ease-linear rounded ${isRow ? 'h-[160px]' : 'h-[300px]'
                        }`}
                />

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(movie);
                    }}
                    className="absolute top-2 right-2 p-1 cursor-pointer rounded-full bg-black/60 group-hover:bg-black/80 transition"
                >
                    <Heart
                        size={22}
                        fill={isFavorited(movie) ? 'red' : 'none'}
                        color={isFavorited(movie) ? 'red' : 'white'}
                        className="transition-colors duration-150"
                    />
                </button>

                {!isRow && (
                    <div className="mt-2 text-sm text-center font-medium">
                        {movie.title || movie.name}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MovieCard;
