import React from 'react';

export default function HeroBanner() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <div className="h-100 bg-gradient-to-r from-red-900 to-black text-center flex items-center justify-center">
      <div>
        <h1 className="text-6xl font-bold text-[#dc3636]">MovieFlix</h1>
        {user && (
          <h2 className="text-white text-2xl mt-2">
            Welcome, <span className="text-red-400 font-semibold">{user.name || user.email}</span>
          </h2>
        )}
        <p className="py-2 text-white text-lg">
          Discover amazing movies and build your personal favorites collection
        </p>
      </div>
    </div>
  );
}
