import { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Main from './pages/Main';
import ForgotPassword from './pages/ForgotPassword';
import LandingPage from './pages/LandingPage';
import { AuthContext } from './context/AuthContext';
import { auth } from './firebase';
import Account from './pages/Account';
import NotFound from './pages/NotFound';
import Loader from './components/Loader'
import SubscriptionUnavailable from './pages/UnAvailableSubscriptions';
import Favorites from './pages/Favorites';
import MoviePage from './pages/MoviePage';
import SearchResults from './pages/SearchResults';

function App() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setIsLoading(false);
      } else {
        setCurrentUser(null);
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, [setCurrentUser]);

  if (isLoading) return <Loader />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={currentUser ? <Main /> : <LandingPage />} />
        <Route path="/signup" element={currentUser ? <Main /> : <Signup setIsLoading={setIsLoading} />} />
        <Route path="/login" element={currentUser ? <Main /> : <Login setIsLoading={setIsLoading} />} />
        <Route path="/forgot" element={currentUser ? <Main  /> : <ForgotPassword setIsLoading={setIsLoading} />} />
        <Route path="/account" element={currentUser ? <Account /> : <LandingPage />} />
        <Route path="/subscriptions" element={currentUser ? <SubscriptionUnavailable /> : <LandingPage />} />
        <Route path="/favorites" element={currentUser ? <Favorites /> : <LandingPage />} />
        <Route path="/movie/:id" element={currentUser ? <MoviePage /> : <LandingPage />} />
        <Route path="/search" element={currentUser ? <SearchResults /> : <LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
