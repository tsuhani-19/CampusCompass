import React, { useState, useEffect } from "react";
import axios from "axios";
import SimpleRoadmap from "./SimpleRoadmap.jsx";

const Entrepreneur = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    organizer: "",
    password: "",
  });

  const [activeCard, setActiveCard] = useState(null); // 'incubation', 'startup', or null

  // Fetch Events from Backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/events/events");
        setEvents(response.data.events);
      } catch (error) {
        console.error("❌ Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Submitting Event Data:", eventData);

    try {
      const response = await axios.post("http://localhost:5001/api/events/addEvent", eventData);

      if (response.data.success) {
        setEvents([...events, response.data.event]);
        alert("✅ Event Added Successfully!");
        setShowPanel(false);
        setEventData({ title: "", description: "", date: "", organizer: "", password: "" });
      } else {
        alert("❌ Failed to add event: " + response.data.message);
      }
    } catch (error) {
      console.error("❌ Error adding event:", error);
      alert("❌ Error adding event. Please check your input.");
    }
  };

  // Toggle card selection
  const toggleCard = (cardType) => {
    setActiveCard((prev) => (prev === cardType ? null : cardType));
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans relative">
      <section className="py-12 px-6 bg-gray-100">
        {/* Add Event Button */}
        {!activeCard && (
          <div className="flex justify-center mb-6">
            <button 
              onClick={() => setShowPanel(true)} 
              className="bg-purple-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-purple-500 transition"
            >
              Add Event
            </button>
          </div>
        )}

        {/* Cards Container */}
        <div className="flex justify-center">
        <div className={`flex ${activeCard ? 'justify-start' : 'justify-center'} gap-6 p-4 mb-8 w-full max-w-4xl transition-all duration-300`}>

            {/* Incubation Card */}
            <div 
              className={`w-80 h-auto p-6 border rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300 cursor-pointer ${
                activeCard === "incubation" ? "transform -translate-x-32" : 
                activeCard === "startup" ? "transform translate-x-32" : ""
              }`}
              onClick={() => toggleCard("incubation")}
            >
              <h2 className="text-2xl font-bold mb-2 text-purple-700">Incubation Program</h2>
              <p className="text-gray-600 mb-3"><strong className="text-gray-800">Support:</strong> Mentorship, Funding, Resources</p>
              <p className="text-gray-600 mb-3"><strong className="text-gray-800">Duration:</strong> 6-12 months</p>
              <p className="text-gray-600">Transform your idea into a successful business with our comprehensive incubation program.</p>
              <button className="mt-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-500 transition">
                Learn More
              </button>
            </div>

            {/* Startup Card */}
            <div 
              className={`w-80 h-auto p-6 border rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300 cursor-pointer ${
                activeCard === "startup" ? "transform -translate-x-32" : 
                activeCard === "incubation" ? "transform translate-x-32" : ""
              }`}
              onClick={() => toggleCard("startup")}
            >
              <h2 className="text-2xl font-bold mb-2 text-blue-700">Startup Support</h2>
              <p className="text-gray-600 mb-3"><strong className="text-gray-800">Services:</strong> Legal, Marketing, Tech</p>
              <p className="text-gray-600 mb-3"><strong className="text-gray-800">Eligibility:</strong> Early-stage startups</p>
              <p className="text-gray-600">Get expert guidance and resources to accelerate your startup's growth.</p>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Show Roadmap when incubation is selected */}
        {activeCard === "incubation" && <SimpleRoadmap />}

        {/* Show Startup content when startup is selected */}
        {activeCard === "startup" && (
          <div className="w-full px-6 py-10 bg-white rounded-lg shadow-inner mt-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Startup Support Services</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-100 p-4 rounded shadow-sm">
                <h4 className="font-semibold text-lg text-blue-700">Legal Assistance</h4>
                <p className="text-gray-700">Company registration, IP protection, and compliance services</p>
              </div>
              <div className="bg-gray-100 p-4 rounded shadow-sm">
                <h4 className="font-semibold text-lg text-blue-700">Marketing Support</h4>
                <p className="text-gray-700">Branding, digital marketing, and PR strategies</p>
              </div>
              <div className="bg-gray-100 p-4 rounded shadow-sm">
                <h4 className="font-semibold text-lg text-blue-700">Tech Resources</h4>
                <p className="text-gray-700">Cloud credits, development tools, and technical mentorship</p>
              </div>
            </div>
          </div>
        )}

        {/* Events - only show when nothing else is selected */}
        {activeCard === null && (
          <div className="flex flex-wrap justify-center gap-6 p-4">
            {events.map((event, index) => (
              <div key={index} className="w-80 h-auto p-6 border rounded-xl shadow-lg bg-white">
                <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                <p className="text-gray-600"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                {event.organizer && <p className="text-gray-600"><strong>Organizer:</strong> {event.organizer}</p>}
                <p className="text-gray-600">{event.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add Event Panel */}
      {showPanel && (
        <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg p-6 transition-transform transform translate-x-0">
          <h2 className="text-2xl font-bold mb-4">Add Event</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input type="text" name="title" placeholder="Event Title" value={eventData.title} onChange={handleInputChange} className="p-2 border rounded" required />
            <textarea name="description" placeholder="Event Description" value={eventData.description} onChange={handleInputChange} className="p-2 border rounded" required />
            <input type="date" name="date" value={eventData.date} onChange={handleInputChange} className="p-2 border rounded" required />
            <input type="text" name="organizer" placeholder="Organizer Name" value={eventData.organizer} onChange={handleInputChange} className="p-2 border rounded" />
            <input type="password" name="password" placeholder="Admin Password" value={eventData.password} onChange={handleInputChange} className="p-2 border rounded" required />

            <div className="flex justify-between">
              <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-500 transition">
                Submit
              </button>
              <button type="button" onClick={() => setShowPanel(false)} className="bg-red-600 text-white py-2 px-4 rounded shadow-md hover:bg-red-500 transition">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Entrepreneur;