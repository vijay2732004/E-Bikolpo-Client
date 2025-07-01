
import React from 'react';
import Marquee from 'react-fast-marquee';

const Marque = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 py-3">
      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        <p className="text-white font-semibold text-lg mx-10">
          🔍 Find your perfect roommate — Secure, Fast, and Easy!
        </p>
        <p className="text-white font-semibold text-lg mx-10">
          🏠 Browse verified listings near you now!
        </p>
        <p className="text-white font-semibold text-lg mx-10">
          💬 Chat directly with users | 📍 Filter by location | 🛡️ 100% Verified
        </p>
        <p className="text-white font-semibold text-lg mx-10">
          🚀 Join Roommate Finder — Built for real connections!
        </p>
      </Marquee>
    </div>
  );
};

export default Marque;
