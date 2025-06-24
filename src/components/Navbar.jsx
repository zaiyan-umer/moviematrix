import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';

function Navbar({ isSignup = false, isLoggedIn = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()

  const handleShow = () => {
    if (window.scrollY > 50) setScrolled(true);
    else setScrolled(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleShow);
    return () => window.removeEventListener('scroll', handleShow);
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div
      className={`navbar absolute top-0 left-0 z-20 flex items-center justify-between px-34 py-2.5 max-lg:px-18 max-sm:px-6 max-sm:py-2 duration-300 transition-all
        ${isLoggedIn ? 'sticky' : 'w-screen'}
        ${scrolled ? '-translate-y-2' : 'translate-y-0'}
        ${scrolled && isLoggedIn ? 'bg-black' : 'bg-transparent'}`}
    >
      <Link to='/'>
        <img
          loading='lazy'
          className='w-[190px] max-sm:w-[100px] cursor-pointer'
          src="/Netflix_Logo_RGB.png"
          alt="Netflix"
        />
      </Link>

      <div className='flex items-center gap-4'>
        {isSignup && (
          <Link to="/signup">
            <button className='red-clr cursor-pointer text-white text-sm border-none rounded-md font-semibold px-4 py-1.5 tracking-tight'>
              Sign up
            </button>
          </Link>
        )}

        {isLoggedIn && (
          <>
            <div className="max-sm:hidden flex items-center gap-2 bg-[#1c1c1c] px-3 py-1.5 rounded-lg border border-gray-600 focus-within:ring-2 focus-within:ring-red-600 transition">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search movies..."
                className="bg-transparent outline-none text-white placeholder-gray-400 text-sm w-60 max-sm:w-24"
              />
              <button
                onClick={handleSearch}
                className="p-1.5 bg-red-600 hover:bg-red-700 rounded-full transition cursor-pointer"
              >
                <Search size={16} className="text-white" />
              </button>
            </div>
            <Link to='/favorites'>
              <Heart
                className='cursor-pointer text-white hover:fill-red-500 hover:text-red-500 transition duration-150 z-[4]'
                size={28}
                strokeWidth={2}
              />
            </Link>

            <Link to='/account'>
              <img
                className='max-w-[40px] max-sm:w-[30px] cursor-pointer'
                src="/user.png"
                alt="User"
              />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
