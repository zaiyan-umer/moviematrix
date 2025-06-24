import React, { useState, useEffect, useContext, Suspense, lazy } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTrailerId } from '../data/fetchTrailer';
import { Helmet } from 'react-helmet';
import { debounce } from 'lodash';
import { Play, Plus, Heart, ArrowLeft } from 'lucide-react';
import MovieNotAvailable from '../components/MovieNotAvailable';
import defaultProfile from '/profile3.png';

const TrailerPlayer = lazy(() => import('../components/TrailerPlayer'));
const TrailerNotAvailable = lazy(() => import('../components/TrailerNotAvailable'));

function MoviePage() {
  const { error, setError, favorites, toggleFavorite } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [trailerId, setTrailerId] = useState(null);
  const [noTrailerFor, setNoTrailerFor] = useState(null);
  const { id } = useParams();
  const base_url = 'https://image.tmdb.org/t/p/w780/';
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setError(null);
      try {
        const cache = await caches.open('movie-cache');
        const cachedResponse = await cache.match(`movie-${id}`);
        if (cachedResponse) {
          setMovie(await cachedResponse.json());
          return;
        }
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=credits`
        );
        if (!res.ok) throw new Error('Movie not found');
        const data = await res.json();
        await cache.put(`movie-${id}`, new Response(JSON.stringify(data)));
        setMovie(data);
      } catch (err) {
        setError(err.message);
        setMovie(null);
      }
    };
    load();
  }, [id]);

  const playTrailer = debounce(async (movieId, movieTitle) => {
    try {
      const id = await fetchTrailerId(movieId);
      if (id) {
        setTrailerId(id);
        setNoTrailerFor(null);
      } else {
        setTrailerId(null);
        setNoTrailerFor(movieTitle || 'this title');
      }
    } catch (err) {
      setError(err.message);
    }
  }, 300);

  if (!movie && !error) {
    return (
      <div className="relative text-white min-h-screen bg-black">
        <Navbar isLoggedIn />
        <div className="p-8 max-w-5xl mx-auto">
          <div className="h-12 w-1/2 bg-gray-700 animate-pulse mb-4"></div>
          <div className="h-4 w-1/4 bg-gray-700 animate-pulse mb-4"></div>
          <div className="h-20 w-3/4 bg-gray-700 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!movie && error) {
    return <MovieNotAvailable />;
  }

  const isFav = movie && favorites.some(f => f.id === movie.id);

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://api.themoviedb.org" />
        <link rel="preconnect" href="https://image.tmdb.org" />
        {movie?.backdrop_path && (
          <link rel="preload" as="image" href={`${base_url}${movie?.backdrop_path}`} />
        )}
      </Helmet>
      <div
        className="relative text-white min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
          minHeight: '100vh',
          backgroundSize: 'cover',
        }}
      >
        <div className={`absolute inset-0 ${movie?.backdrop_path ? 'bg-black/70' : 'bg-black'}`}></div>
        <Navbar isLoggedIn />
        <div className="relative z-10 p-8 max-w-5xl mx-auto flex flex-col gap-4">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center cursor-pointer text-gray-300 hover:text-white transition duration-150"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-xl">{movie?.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span>{(movie?.runtime / 60).toFixed(0)}h {movie?.runtime % 60}m</span>
            <span>{movie?.release_date?.substring(0, 4)}</span>
            <span>⭐ {movie?.vote_average.toFixed(1)}</span>
          </div>
          <p className="text-gray-300 italic text-sm">{movie?.genres.map(g => g.name).join(', ')}</p>
          <p className="leading-relaxed max-w-3xl text-gray-200">{movie?.overview}</p>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => playTrailer(movie?.id, movie?.name || movie?.title)}
              className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 hover:scale-105 rounded font-semibold cursor-pointer transition-transform"
            >
              <Play className="w-4 h-4" /> Play Trailer
            </button>
            <button
              onClick={() => toggleFavorite(movie)}
              className={`flex items-center gap-2 px-6 py-2 rounded font-semibold cursor-pointer transition-transform ${
                isFav ? 'bg-gray-700' : 'bg-gray-500 hover:bg-gray-600 hover:scale-105'
              }`}
            >
              {isFav ? <Heart className="w-4 h-4" /> : <Plus className="w-4 h-4" />}{' '}
              {isFav ? 'Remove from List' : 'Add to List'}
            </button>
          </div>
          <h2 className="mt-8 text-xl font-semibold">Top Cast</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-2 min-h-[400px]">
            {movie?.credits?.cast?.slice(0, 5).map((c) => (
              <a
                key={c.id}
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(c.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center hover:scale-105 transition-transform"
                title={`View ${c.name} on Wikipedia`}
              >
                <img
                  loading="lazy"
                  src={c.profile_path ? `https://image.tmdb.org/t/p/w92${c.profile_path}` : defaultProfile}
                  alt={c.name}
                  width="92"
                  height="138"
                  className="w-full rounded-md object-cover aspect-[2/3] border border-gray-700"
                />
                <p className="mt-2 text-sm font-medium">{c.name}</p>
                <p className="text-xs text-gray-400">{c.character}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <TrailerPlayer trailerId={trailerId} onClose={() => setTrailerId(null)} />
        {noTrailerFor && (
          <TrailerNotAvailable setNoTrailerFor={setNoTrailerFor} noTrailerFor={noTrailerFor} />
        )}
      </Suspense>
    </>
  );
}

export default MoviePage;