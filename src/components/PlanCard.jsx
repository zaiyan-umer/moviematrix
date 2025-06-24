import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlanCard = React.memo(({ plan, isCurrent }) => {
    const navigate = useNavigate();

  return (
    <div className={`relative bg-[#111] text-white w-full max-w-[500px] px-6 py-5 rounded-xl border border-gray-700 shadow-md flex flex-col justify-between hover:border-red-600 transition-all ${isCurrent && 'border-red-600'}`}>

      {plan.mostPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-sm font-semibold">
          Most Popular
        </div>
      )}

      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold">{plan.name}</h2>
        <p className="text-sm text-gray-400">{plan.resolution}</p>
      </div>

      <div className="text-sm text-gray-300 space-y-1 mb-6">
        <p><span className="text-white font-medium">Price:</span> {plan.price}</p>
        <p><span className="text-white font-medium">Quality:</span> {plan.quality}</p>
        <p><span className="text-white font-medium">Devices:</span> {plan.devices}</p>
        <p><span className="text-white font-medium">Streams:</span> {plan.streams}</p>
        <p><span className="text-white font-medium">Downloads:</span> {plan.downloads}</p>
      </div>

      <div className="w-full">
        {isCurrent ? (
          <button className="w-full bg-gray-700 text-white text-sm px-4 py-2 rounded-md">
            Current Plan
          </button>
        ) : (
          <button onClick={() => navigate('/subscriptions')} className="w-full bg-red-600 hover:bg-red-700 cursor-pointer text-sm px-4 py-2 rounded-md font-medium transition">
            Subscribe
          </button>
        )}
      </div>
    </div>
  );
})

export default PlanCard;
