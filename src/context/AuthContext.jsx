import { useState, useEffect, createContext, useMemo } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => signOut(auth);

  const toggleFavorite = (movie) => {
    setFavorites(prev => {
      const exists = prev.some(m => m.id === movie.id);
      const updated = exists ? prev.filter(m => m.id !== movie.id) : [...prev, movie];
      saveFavoritesToFirestore(currentUser?.uid, updated);
      return updated;
    });
  };

  // Check if a movie is favorited
  const isFavorited = (movie) => {
    return favorites.some(fav => fav.id === movie.id);
  };

  // Save favorites to Firestore
  const saveFavoritesToFirestore = async (uid, favs) => {
    if (!uid) return;
    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, { favorites: favs }, { merge: true });
    } catch (err) {
      console.error("Error saving favorites:", err.message);
    }
  };

  // Load favorites from Firestore
  const loadFavorites = async (uid) => {
    if (!uid) return;
    try {
      const userRef = doc(db, 'users', uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists() && docSnap.data().favorites) {
        setFavorites(docSnap.data().favorites);
      } else {
        setFavorites([]);
      }
    } catch (err) {
      console.error("Error loading favorites:", err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) await loadFavorites(user.uid);
      else setFavorites([]);
    });

    return () => unsubscribe();
  }, []);

  

  const contextValue = useMemo(() => ({
    currentUser,
    setCurrentUser,
    signup,
    login,
    error,
    setError,
    forgotPassword,
    logout,
    googleSignIn,
    favorites,
    toggleFavorite,
    isFavorited,
  }), [currentUser, error, favorites]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
