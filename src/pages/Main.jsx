import Navbar from '../components/Navbar'
import MovieBanner from '../components/MovieBanner'
import MovieRow from '../components/MovieRow'
import requests from '../data/requests'


function Main() {
    return (
        <>
            <Navbar isLoggedIn />
            <MovieBanner />
            <div className="relative">
                <div className="fixed top-0 left-0 w-full h-screen bg-black z-[-5]">
                    <div className="absolute top-0 left-0 w-full h-5 bg-gradient-to-b from-transparent to-black"></div>
                </div>
                <div className="rows px-12 py-1 overflow-hidden">
                    <MovieRow title="NETFLIX ORIGINALS" fetchURL={requests.fetchNetflixOriginals} isLarge />
                    <MovieRow title="TRENDING NOW" fetchURL={requests.fetchTrending} />
                    <MovieRow title="TOP RATED" fetchURL={requests.fetchTopRated} />
                    <MovieRow title="ACTION MOVIES" fetchURL={requests.fetchActionMovies} />
                    <MovieRow title="ANIMATED MOVIES" fetchURL={requests.fetchAnimatedMovies} />
                    <MovieRow title="COMEDY MOVIES" fetchURL={requests.fetchComedyMovies} />
                    <MovieRow title="HORROR MOVIES" fetchURL={requests.fetchHorrorMovies} />
                    <MovieRow title="TV MOVIES" fetchURL={requests.fetchTVMovies} />
                    <MovieRow title="FAMILY MOVIES" fetchURL={requests.fetchFamilyMovies} />
                    <MovieRow title="WESTERN MOVIES" fetchURL={requests.fetchWesternMovies} />
                    <MovieRow title="MYSTERY MOVIES" fetchURL={requests.fetchMysteryMovies} />
                    <MovieRow title="SCI-FI MOVIES" fetchURL={requests.fetchSciFiMovies} />
                    <MovieRow title="ROMANTIC MOVIES" fetchURL={requests.fetchRomanticMovies} />
                    {/* <MovieRow title="DOCUMENTARIES" fetchURL={requests.fetchDocumentaries} /> */}
                    <MovieRow title="DRAMA MOVIES" fetchURL={requests.fetchDramaMovies} />
                    <MovieRow title="FANTASY MOVIES" fetchURL={requests.fetchFantasyMovies} />
                    <MovieRow title="CRIME MOVIES" fetchURL={requests.fetchCrimeMovies} />
                    <MovieRow title="WAR MOVIES" fetchURL={requests.fetchWarMovies} />
                    <MovieRow title="MUSIC MOVIES" fetchURL={requests.fetchMusicMovies} />
                    <MovieRow title="HISTORY MOVIES" fetchURL={requests.fetchHistoryMovies} />
                </div>

            </div>

        </>
    )
}

export default Main