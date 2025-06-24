import { useState, useEffect, useContext } from 'react';
import axios from '../data/axios';
import requests from '../data/requests';
import { fetchTrailerId } from '../data/fetchTrailer';
import TrailerNotAvailable from './TrailerNotAvailable';
import TrailerPlayer from './TrailerPlayer';
import { AuthContext } from '../context/AuthContext';


function MovieBanner() {
    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    }

    const [movie, setMovie] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const requestValues = Object.values(requests);

            const randomURL = requestValues[Math.floor(Math.random() * requestValues.length)];

            const response = await axios.get(randomURL);

            const moviesWithBackdrop = response.data.results.filter(
                (movie) => movie.backdrop_path
            );

            const randomMovie =
                moviesWithBackdrop[Math.floor(Math.random() * moviesWithBackdrop.length)];

            setMovie(randomMovie);
        };

        fetchData();
    }, []);

    const [trailerId, setTrailerId] = useState(null);
    const [noTrailerFor, setNoTrailerFor] = useState(null);
    const { toggleFavorite } = useContext(AuthContext);

    const handleClick = async (movieId, movieTitle) => {
        const id = await fetchTrailerId(movieId);
        if (id) {
            setTrailerId(id);
            setNoTrailerFor(null);
        } else {
            setNoTrailerFor(movieTitle || "this title");
        }
    };

    return (
        <>
            <div className="main pt-15 pb-8 px-30 flex flex-col items-start max-md:px-15 max-md:py-8 max-sm:px-8 max-sm:py-52 max-sm:items-center">
                <div className='overflow-hidden'>
                    <img rel="preload" className='z-[-1] absolute top-0 left-0 w-screen h-[70vh] object-cover overflow-hidden' src={`https://image.tmdb.org/t/p/w780/${movie?.backdrop_path}`} alt="" />
                    <div className="overlay pointer-events-none absolute inset-0 -z-1 w-full h-[70vh] bg-gradient-to-r from-black/70 via-black/30 to-black/70" />
                </div>
                <div className='flex flex-col gap-5 max-sm:absolute max-sm:bottom-[34vh]'>
                    <h1 className='text-4xl font-bold text-white max-sm:text-2xl max-sm:text-center'>{movie?.title || movie?.name}</h1>
                    <div className="btns flex max-sm:justify-center">
                        <button onClick={() => handleClick(movie.id, movie.name || movie.title)} className='text-lg px-8 py-1 ml-2 text-white bg-[#393837e5] cursor-pointer border-none rounded-sm'>Play</button>
                        <button onClick={() => toggleFavorite(movie)} className='text-lg px-8 py-1 ml-2 text-white bg-[#393837e5] cursor-pointer border-none rounded-sm'>My list</button>
                    </div>
                    <h5 className='text-white font-normal w-[40%] max-lg:w-[60%] max-sm:hidden'>{truncate(movie?.overview, 180)}</h5>
                </div>
            </div >
            <TrailerPlayer trailerId={trailerId} onClose={() => setTrailerId(null)} />
            {noTrailerFor && <TrailerNotAvailable setNoTrailerFor={setNoTrailerFor} noTrailerFor={noTrailerFor} />}
        </>
    )
}

export default MovieBanner;