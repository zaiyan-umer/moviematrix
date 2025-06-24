import { React, useContext, useEffect } from 'react'
import Banner from '../components/Banner'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'


function LandingPage() {
    const navigate = useNavigate();
    const handleSubmit = e => {
        e.preventDefault();
        navigate('/signup');
    }

    return (
        <>
            <Banner />
            <Navbar isSignup />
            <div className="sign-up-text px-4 flex flex-col items-center justify-center gap-6 absolute top-[5%] max-sm:top-[-8%] h-[calc(100vh-5%)] w-screen text-white z-3">
                <h1 className='text-6xl w-[55vw] max-lg:w-[65vw] max-md:text-5xl max-sm:text-4xl max-sm:w-[80vw] font-black text-center leading-18 max-lg:leading-12'>
                    Unlimited movies, TV shows, and more
                </h1>
                <h2 className='text-xl font-semibold max-md:text-lg text-center'>
                    Starts at Rs 250. Cancel anytime.
                </h2>
                <h3 className='text-lg max-md:text-md max-sm:text-sm text-center'>
                    Ready to watch? Enter your email to create or restart your membership.
                </h3>

                <form action="" className='flex items-center justify-center max-sm:flex-col max-sm:gap-2' onSubmit={handleSubmit}>
                    <input
                        type="email"
                        required
                        className='outline-none border border-gray-400 px-4 py-3 rounded-md mx-2 bg-[rgba(23,22,22,0.57)] w-[30vw] max-w-[400px] max-sm:w-[80vw] max-md:w-[50vw]'
                        placeholder='Email address'
                        name="email"
                        id="email"
                    />
                    <input
                        type="submit"
                        className='red-clr cursor-pointer text-white text-xl border-none rounded-md font-bold px-4 py-2.5 tracking-tight'
                        value="Get Started"
                    />
                </form>
            </div>
            
        </>

    )
}

export default LandingPage