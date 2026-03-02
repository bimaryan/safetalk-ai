import React from 'react';

const Home = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Total Chats', value: '1,284', color: 'bg-blue-500' },
          { title: 'Secure Messages', value: '892', color: 'bg-green-500' },
          { title: 'User Rating', value: '4.9/5', color: 'bg-purple-500' },
        ].map((card, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-lg ${card.color} mb-4 opacity-90`}></div>
            <p className="text-gray-500 text-sm">{card.title}</p>
            <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;