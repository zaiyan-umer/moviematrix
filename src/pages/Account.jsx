import { useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import avatar from '/user.png';
import PlanCard from '../components/PlanCard';
import plans from '../data/planData';
import { ArrowLeft } from 'lucide-react';

function AccountPage({ setIsLoading }) {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleBack = useCallback(() => navigate('/'), [navigate]);

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    navigate('/');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={handleBack}
          className="mb-4 flex items-center cursor-pointer text-gray-300 hover:text-white transition duration-150"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>

        <div className="mb-8 flex items-center gap-4">
          <img src={avatar} alt="profile" className="w-16 h-16 rounded-md" loading='lazy' />
          <input
            type="text"
            value={currentUser?.email}
            disabled
            className="bg-[#1c1c1c] text-white px-4 py-2 rounded-md w-full border border-gray-600 outline-none"
          />
        </div>

        <h2 className="text-3xl font-bold mb-6">Choose Your Plan</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} isCurrent={plan.name === 'Premium'} />
          ))}

        </div>

        <button
          onClick={handleLogout}
          className="mt-12 w-full bg-red-600 hover:bg-red-700 py-3 rounded font-semibold text-white cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
