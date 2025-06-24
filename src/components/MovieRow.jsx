import React, { useState, useEffect, useRef } from 'react';
import axios from '../axios/axios';
import { Helmet } from 'react-helmet';
import MovieCard from './MovieCard';

function MovieRow({ title, fetchURL, isLarge = false }) {
  const [movies, setMovies] = useState([]);
  const movieCacheRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (movieCacheRef.current) {
        setMovies(movieCacheRef.current);
        return;
      }

      try {
        const cache = await caches.open('movie-row-cache');
        const cachedResponse = await cache.match(fetchURL);
        if (cachedResponse) {
          const data = await cachedResponse.json();
          const validResults = Array.isArray(data.results) ? data.results : [];
          movieCacheRef.current = validResults;
          setMovies(validResults);
          return;
        }

        const request = await axios.get(fetchURL);
        const validResults = Array.isArray(request.data?.results) ? request.data.results : [];
        movieCacheRef.current = validResults;
        setMovies(validResults);

        await cache.put(fetchURL, new Response(JSON.stringify(request.data)));
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };

    fetchData();
  }, [fetchURL]);

  if (!movies.length) {
    return (
      <div className="row py-3">
        <h2 className="text-xl text-white tracking-tight font-semibold mt-2">{title}</h2>
        <div className="overflow-x-scroll hide-scrollbar">
          <div className={`movieRow flex gap-4 my-2 ${isLarge ? 'min-h-[400px]' : 'min-h-[200px]'}`}>
            {Array(8).fill().map((_, index) => (
              <div key={index} className="w-36 h-54 bg-gray-700 animate-pulse rounded-md" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLarge && movies[0]?.poster_path && (
        <Helmet>
          <link rel="preconnect" href="https://api.themoviedb.org" />
          <link rel="preconnect" href="https://image.tmdb.org" />
          <link
            rel="preload"
            as="image"
            href={`https://image.tmdb.org/t/p/w342${movies[0].poster_path}`}
          />
        </Helmet>
      )}
      <div className="row py-3 overflow-x-scroll hide-scrollbar">
        <h2 className="text-xl text-white tracking-tight font-semibold mt-2">{title}</h2>
        <div className={`movieRow flex gap-4 my-2 ${isLarge ? 'min-h-[400px]' : 'min-h-[200px]'}`}>
          {movies.slice(0, 8).map((movie) => (
            <MovieCard key={movie.id} movie={movie} isRow={!isLarge} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MovieRow;