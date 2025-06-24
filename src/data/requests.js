const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const requests = {
    fetchTrending : `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals : `discover/tv?api_key=${API_KEY}&with_network=213`,
    fetchTopRated : `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies : `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies : `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies : `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanticMovies : `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries : `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchAnimatedMovies : `/discover/movie?api_key=${API_KEY}&with_genres=16`,
    fetchSciFiMovies : `/discover/movie?api_key=${API_KEY}&with_genres=878`,
    fetchMysteryMovies : `/discover/movie?api_key=${API_KEY}&with_genres=9648`,
    fetchDramaMovies : `/discover/movie?api_key=${API_KEY}&with_genres=18`,
    fetchFantasyMovies : `/discover/movie?api_key=${API_KEY}&with_genres=14`,
    fetchCrimeMovies : `/discover/movie?api_key=${API_KEY}&with_genres=80`,
    fetchWarMovies : `/discover/movie?api_key=${API_KEY}&with_genres=10752`,
    fetchMusicMovies : `/discover/movie?api_key=${API_KEY}&with_genres=10402`,
    fetchHistoryMovies : `/discover/movie?api_key=${API_KEY}&with_genres=36`,
    fetchTVMovies : `/discover/movie?api_key=${API_KEY}&with_genres=10770`,
    fetchFamilyMovies : `/discover/movie?api_key=${API_KEY}&with_genres=10751`,
    fetchWesternMovies : `/discover/movie?api_key=${API_KEY}&with_genres=37`,
}

export default requests;