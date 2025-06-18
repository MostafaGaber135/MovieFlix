import React from 'react';
export default function HeroBanner() {
  return (
    <div className="h-100 bg-gradient-to-r from-red-900 to-black text-center flex items-center justify-center">
      <div>
        <h1 className="text-6xl font-bold text-[#dc3636]">MovieFlix</h1>
        <p className="py-2 text-white text-lg">
          Discover amazing movies and build your personal favorites collection
        </p>
      </div>
    </div>
  );
}
