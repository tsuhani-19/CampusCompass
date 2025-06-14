import React, { useEffect, useRef } from 'react';

// Import success story images
import success1 from '../assets/success1.jpeg';
import success2 from '../assets/success2.jpeg';
import success3 from '../assets/success3.jpeg';
import success4 from '../assets/success4.jpeg';

const steps = [
  { 
    title: "Discover", 
    description: "Validate your idea & market fit",
  },
  { 
    title: "Build", 
    description: "Develop your MVP",
  },
  { 
    title: "Test", 
    description: "Launch pilot with users",
  },
  { 
    title: "Scale", 
    description: "Expand & seek investment",
  },
];

const successStories = [
  {
    id: 1,
    image: success3,
    alt: "SLRTCE team at TechGyan 5025 Hackathon",
    name: "TE Computer Team",
    company: "SLRTCE", 
    quote: "Top Performers at TechGyan 5025 National Hackathon",
    achievement: "Recognized among the best technical teams at this prestigious national competition",
    event: "TechGyan 5025 National Level Hackathon"
  },
  {
    id: 2,
    image: success2,
    alt: "Hemant Kadam at Google Build & Blog Marathon",
    name: "Hemant Kadam",
    company: "TE CMPN, SLRTCE",
    quote: "3rd Runner-Up at Google Build & Blog Marathon",
    achievement: "Secured top 5 position among 30 national participants",
    event: "Google Build & Blog Marathon, Mumbai"
  },
  {
    id: 4,
    image: success4,
    alt: "Team presenting at HerSpark Hackathon",
    name: "Tech Women - CS Third Year Team",
    company: "SLRTCE",
    quote: "Finalists at HerSpark Hackathon 2024 hosted by Thakur College",
    achievement: "Built Career Readiness Navigator to empower students with placement insights and personalized skill recommendations",
    event: "HerSpark Hackathon by Thakur College of Engineering"
  },
  {
    id: 3,
    image: success1,
    alt: "TE Computer team at National Hackathon",
    name: "TE Computer Team",
    company: "SLRTCE",
    quote: "3rd Place & Best UI/UX Design Award",
    achievement: "Outperformed 422 teams from across India",
    event: "National Level Hackathon & Webathon"
  },



];

const SimpleRoadmap = () => {
  const scrollContainerRef = useRef(null);
  const scrollInterval = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    
    // Function to handle auto-scrolling
    const startScrolling = () => {
      let scrollAmount = 0;
      const step = 1;
      const delay = 30; // milliseconds between each scroll step
      
      scrollInterval.current = setInterval(() => {
        scrollContainer.scrollLeft += step;
        scrollAmount += step;
        
        // When we've scrolled the equivalent of one container width, reset to start
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
          scrollAmount = 0;
        }
      }, delay);
    };

    startScrolling();

    // Pause on hover
    const handleMouseEnter = () => {
      clearInterval(scrollInterval.current);
    };
    
    const handleMouseLeave = () => {
      startScrolling();
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(scrollInterval.current);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="w-full px-4 py-12 bg-white rounded-lg">
      {/* Roadmap Section */}
      <h3 className="text-2xl font-bold text-center mb-12 text-gray-800">Startup Roadmap</h3>
      
      <div className="relative">
        {/* Horizontal line */}
        <div className="absolute left-8 right-8 top-1/2 h-1 bg-purple-200 transform -translate-y-1/2"></div>
        
        <div className="flex justify-between relative z-10 px-4">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center relative">
              {/* Dot */}
              <div className="w-6 h-6 rounded-full bg-purple-600 border-4 border-white shadow-md"></div>
              
              {/* Card - Alternating top/bottom */}
              <div className={`absolute ${idx % 2 === 0 ? 'top-full mt-6' : 'bottom-full mb-6'} w-48`}>

                <div className="p-3 rounded-lg shadow-md bg-white text-center border border-gray-100">
                  <h4 className="font-bold text-purple-700 text-sm">{step.title}</h4>
                  <p className="text-gray-600 text-xs mt-1">{step.description}</p>
                  <div className="mt-1 text-xs font-medium text-purple-400">
                    Phase {idx + 1}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Success Stories Section */}
      <div className="mt-24">
        <h3 className="text-2xl font-bold text-center mb-12 text-gray-800">Success Stories</h3>
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-hidden pb-6 px-4 gap-8 scrollbar-hide"
        >
          {successStories.map((story) => (
            <div 
              key={story.id} 
              className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative group"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={story.image} 
                  alt={story.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium">View Details →</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-purple-700">{story.name}</h4>
                    <p className="text-gray-600 mb-2">{story.company}</p>
                  </div>
                  <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    #{story.id}
                  </div>
                </div>
                <p className="font-semibold text-purple-600 mb-3">"{story.quote}"</p>
                <p className="text-sm text-gray-700 mb-3">{story.achievement}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {story.event}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleRoadmap;