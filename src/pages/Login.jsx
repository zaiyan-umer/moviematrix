import React, { useState, useEffect, useContext, useRef } from 'react';
import Banner from '../components/Banner';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login({ isLoading, setIsLoading }) {
    const { login, googleSignIn, error, setError, setCurrentUser } = useContext(AuthContext);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const navigate = useNavigate();
    const [isSm, setIsSm] = useState(window.innerWidth <= 640);

    useEffect(() => {
        const handleResize = () => setIsSm(window.innerWidth <= 640);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!emailRef.current.value || !passRef.current.value) {
            setError('Please fill all fields');
            setIsLoading(false);
            return;
        }

        try {
            const user = await login(emailRef.current.value, passRef.current.value);
            setCurrentUser(user);
            setError(null);
            if (emailRef.current) emailRef.current.value = '';
            if (passRef.current) passRef.current.value = '';
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await googleSignIn();
            setCurrentUser(result.user);
            setError(null);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Banner isSm={isSm} />
            <Navbar />

            <div className="fixed inset-0 z-50 flex justify-center items-center  px-4">
                <div className="w-full max-w-[430px] p-8 rounded-lg bg-black/70 text-white">
                    <h1 className="font-bold tracking-tight text-3xl text-center">Sign In</h1>

                    <form className="flex flex-col items-center justify-center w-full mt-8 gap-4" autocomplete="off" onSubmit={handleLogin}>
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="Email address"
                            name="email"
                            className="w-full text-lg px-4 py-2.5 bg-[#171613] outline-none border border-gray-400 rounded-sm"
                        />
                        <input
                            ref={passRef}
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="w-full text-lg px-4 py-2.5 bg-[#171613] outline-none border border-gray-400 rounded-sm"
                        />

                        <div className="w-full text-right text-sm text-gray-300 hover:underline">
                            <Link to="/forgot">Forgot password?</Link>
                        </div>

                        <input
                            type="submit"
                            value="Sign In"
                            className="red-clr cursor-pointer text-white w-full text-sm border-none rounded-sm font-semibold px-4 py-2 tracking-tight"
                        />
                    </form>

                    <div className="flex items-center w-full my-4">
                        <hr className="flex-grow border-gray-600" />
                        <span className="px-3 text-gray-400 text-sm">or</span>
                        <hr className="flex-grow border-gray-600" />
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="mt-2 bg-white text-black font-semibold px-4 py-2 w-full rounded-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition"
                    >
                        <img src="/google.png" alt="Google" className="h-5 w-5" />
                        Continue with Google
                    </button>

                    {error && (
                        <p className="mt-4 text-sm text-center text-red-500 font-medium">
                            {error}
                        </p>
                    )}

                    <p className="text-gray-300 text-sm mt-6 text-center">
                        Don’t have an account?{' '}
                        <Link to="/signup" className="text-white font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

        </>
    );
}

export default Login;
