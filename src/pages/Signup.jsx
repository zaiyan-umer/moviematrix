import { useState, useEffect, useContext, useRef } from 'react';
import Banner from '../components/Banner';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Signup({ setIsLoading }) {
  const [isSm, setIsSm] = useState(window.innerWidth <= 640);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const confirmPassRef = useRef(null);
  const navigate = useNavigate();

  const { signup, googleSignIn, error, setError } = useContext(AuthContext);

  useEffect(() => {
    const handleResize = () => setIsSm(window.innerWidth <= 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSignUp = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!emailRef.current.value || !passRef.current.value || !confirmPassRef.current.value) {
      setError('Please fill all fields');
      setIsLoading(false);
      return;
    }

    if (passRef.current.value !== confirmPassRef.current.value) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const user = await signup(emailRef.current.value, passRef.current.value);
      setError(null);
      if (emailRef.current) emailRef.current.value = '';
      if (passRef.current) passRef.current.value = '';
      if (confirmPassRef.current) confirmPassRef.current.value = '';
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      navigate('/');
    }

  };

  const googleAuthHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const user = await googleSignIn();
      setError(null);
    } catch (err) {
      console.log(err.message);
      setError("Please try again");
    } finally {
      setIsLoading(false);
      navigate('/');
    }
  }

  return (
    <>
      <Banner isSm={isSm} />
      <Navbar />


      <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
        <div className="w-full max-w-[430px] p-8 rounded-lg bg-black/70 text-white">
          <h1 className="font-bold tracking-tight text-3xl text-center">Sign Up</h1>

          <form
            className="flex flex-col items-center justify-center w-full mt-8 gap-4"
            onSubmit={handleSignUp}
            autoComplete="off"
          >
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="Email address"
              className="w-[300px] text-lg px-4 py-2.5 bg-[#171613] outline-none border border-gray-400 rounded-sm"
            />
            <input
              ref={passRef}
              type="password"
              name="password"
              placeholder="Password"
              className="w-[300px] text-lg px-4 py-2.5 bg-[#171613] outline-none border border-gray-400 rounded-sm"
            />
            <input
              ref={confirmPassRef}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-[300px] text-lg px-4 py-2.5 bg-[#171613] outline-none border border-gray-400 rounded-sm"
            />

            <input
              type="submit"
              value="Create Account"
              className="red-clr cursor-pointer text-white w-[300px] text-sm border-none rounded-sm font-semibold px-4 py-2 tracking-tight"
            />

            <div className="flex items-center w-[300px] my-4">
              <hr className="flex-grow border-gray-600" />
              <span className="px-3 text-gray-400 text-sm">or</span>
              <hr className="flex-grow border-gray-600" />
            </div>

            <button
              type="button"
              onClick={googleAuthHandler}
              className="flex items-center cursor-pointer justify-center gap-3 bg-white text-black font-semibold py-2 px-4 w-[300px] rounded-sm hover:bg-gray-200 transition"
            >
              <img src="/google.png" alt="Google" className="h-5 w-5" />

              Sign up with Google
            </button>
          </form>


          {error && (
            <p className="mt-4 text-sm text-center text-red-500 font-medium">
              {error}
            </p>
          )}

          <p className="text-gray-300 text-sm mt-6 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-white font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
