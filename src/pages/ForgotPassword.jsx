import React, { useState, useEffect, useContext, useRef } from 'react';
import Banner from '../components/Banner';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ForgotPassword({ setIsLoading }) {
    const [isSm, setIsSm] = useState(window.innerWidth <= 640);

    useEffect(() => {
        const handleResize = () => {
            setIsSm(window.innerWidth <= 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const emailRef = useRef(null);
    const { forgotPassword, error, setError } = useContext(AuthContext);

    const handleForgotPassword = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        if (!emailRef.current.value) {
            setError('Please enter your email');
            return;
        }

        console.log('Forgot clicked:', {
            email: emailRef.current.value,
        });

        try {
            await forgotPassword(email);
            setError("Password reset email sent successfully.");
            if (emailRef.current) emailRef.current.value = '';
            setTimeout(() => setError(null), 5000);
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

            <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
                <div className="w-full max-w-[430px] p-8 rounded-lg bg-black/70 text-white">
                    <h1 className="font-bold tracking-tight text-3xl text-center">Forgor Password</h1>
                    <p className="text-sm text-gray-300 mt-2 text-center">Enter your email and we'll send you reset instructions.</p>

                    <form autocomplete="off" className="flex flex-col items-center justify-center w-full mt-8 gap-4" onSubmit={handleForgotPassword}>
                        <input
                            ref={emailRef}
                            type="email"
                            name="email"
                            placeholder="Email address"
                            className="w-[300px] text-lg px-4 py-2.5 bg-[#171613] outline-none border border-gray-400 rounded-sm"

                        />

                        <input
                            type="submit"
                            value="Send Reset Link"
                            className="red-clr cursor-pointer text-white w-[300px] text-sm border-none rounded-sm font-semibold px-4 py-2 tracking-tight"
                        />
                    </form>

                    {error && (
                        <p
                            className={`mt-4 text-sm text-center font-medium ${error.toLowerCase().includes('sent') ? 'text-green-400' : 'text-red-500'
                                }`}
                        >
                            {error}
                        </p>
                    )}

                    <p className="text-gray-300 text-sm mt-6 text-center">
                        Remembered your password?{' '}
                        <Link to="/login" className="text-white font-medium hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
