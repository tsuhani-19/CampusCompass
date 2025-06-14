import React from 'react'
import bannerImg from "../../assets/banner.jpg"

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 py-16 md:px-20">
  
    {/* Left Section */}
    <div className="md:w-1/2 w-full">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 leading-tight font-[Poppins]">
        Your Path to Career Success Starts Here
      </h1>
  
      <p className="text-gray-600 text-lg mb-6">
        Discover the best opportunities after engineering—whether it's placements, higher studies, or launching your startup.
      </p>
  
      <div className="flex flex-wrap gap-3 mb-8">
        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">🎓 Higher Studies</span>
        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">💼 Placements</span>
        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">🚀 Entrepreneurship</span>
      </div>
  
      <button className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition">
        Explore Now
      </button>
    </div>
  
    {/* Right Section - Image */}
    <div className="md:w-1/2 w-full flex justify-center">
      <img 
        src={bannerImg} 
        alt="Career Guidance Banner" 
        className="w-full max-w-2xl object-contain" 
      />
    </div>
  </div>
  
  )
}

export default Banner
