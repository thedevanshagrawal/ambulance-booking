import React, { useState, useEffect } from "react";
import {
  Phone,
  Calendar,
  MapPin,
  Clock,
  AlertCircle,
  Heart,
  ArrowRight,
  Moon,
  Sun,
  Menu,
  X,
  Ambulance,
  Activity,
  Navigation
} from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("emergency");
  const [pulseAnimation, setPulseAnimation] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
    
    setIsLoaded(true);

    // Create a pulse animation interval
    const pulseInterval = setInterval(() => {
      setPulseAnimation((prev) => !prev);
    }, 2000);

    return () => clearInterval(pulseInterval);
  }, []);

  // Apply dark mode to document body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"}`}>
      {/* Animated Header */}
      <header
        className={`${darkMode ? "bg-red-900" : "bg-red-600"} transition-all duration-700 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        } sticky top-0 z-50`}
      >
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart
              className={`${pulseAnimation ? "animate-pulse" : ""} text-white`}
              size={24}
            />
            <span className="text-xl font-bold text-white">MediResponse</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-white">
            <Link to="/" className="hover:text-red-200 transition-colors">
              Home
            </Link>
            <Link to="/service" className="hover:text-red-200 transition-colors">
              Services
            </Link>
            <Link to="/about" className="hover:text-red-200 transition-colors">
              About Us
            </Link>
            <Link to="#" className="hover:text-red-200 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode} 
              className="text-white p-2 rounded-full hover:bg-red-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Login Button */}
            <Link
              to="/login"
              className="hidden md:block bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-100 transition-colors dark:hover:bg-red-800 dark:hover:text-white"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col space-y-4 px-4 pb-4 text-white">
            <Link to="#" className="hover:text-red-200 transition-colors">
              Home
            </Link>
            <Link to="#" className="hover:text-red-200 transition-colors">
              Services
            </Link>
            <Link to="#" className="hover:text-red-200 transition-colors">
              About Us
            </Link>
            <Link to="#" className="hover:text-red-200 transition-colors">
              Contact
            </Link>
            <Link
              to="/login"
              className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-100 transition-colors text-center"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section with Animation */}
      <section
        className={`${darkMode ? "bg-gradient-to-r from-red-900 to-red-800" : "bg-gradient-to-r from-red-700 to-red-500"} text-white py-16 transition-all duration-1000 ease-in-out ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 md:flex items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
              Emergency Medical Response
            </h1>
            <p className="text-xl mb-8">
              Fast, reliable ambulance services when you need them most. One tap
              away from life-saving medical assistance.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className={`${darkMode ? "bg-white text-red-900 hover:bg-red-200" : "bg-white text-red-600 hover:bg-red-100"} px-6 py-3 rounded-full font-bold transition-colors flex items-center transform hover:scale-105 duration-200`}>
                <Phone size={20} className="mr-2" />
                Emergency Call
              </button>
              <button className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-colors flex items-center transform hover:scale-105 duration-200">
                <Calendar size={20} className="mr-2" />
                Schedule Transport
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div
              className={`${darkMode ? "bg-gray-800 shadow-xl shadow-red-900/20" : "bg-white shadow-lg"} p-6 rounded-2xl w-full max-w-md transition-all duration-1000 ease-in-out ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <div className="flex mb-6 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                <button
                  className={`flex-1 py-2 text-center font-medium rounded-lg transition-colors ${
                    activeTab === "emergency"
                      ? darkMode ? "bg-red-800 text-white" : "bg-red-600 text-white"
                      : darkMode ? "bg-transparent text-gray-300" : "bg-transparent text-gray-600"
                  }`}
                  onClick={() => setActiveTab("emergency")}
                >
                  Emergency
                </button>
                <button
                  className={`flex-1 py-2 text-center font-medium rounded-lg transition-colors ${
                    activeTab === "scheduled"
                      ? darkMode ? "bg-red-800 text-white" : "bg-red-600 text-white"
                      : darkMode ? "bg-transparent text-gray-300" : "bg-transparent text-gray-600"
                  }`}
                  onClick={() => setActiveTab("scheduled")}
                >
                  Scheduled
                </button>
              </div>

              {activeTab === "emergency" ? (
                <div className="space-y-4">
                  <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                    Request Emergency Ambulance
                  </h3>
                  <div className="relative">
                    <MapPin
                      className={`absolute left-3 top-3 ${darkMode ? "text-gray-400" : "text-gray-400"}`}
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Your current location"
                      className={`w-full pl-10 pr-4 py-2 border ${darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white"} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors`}
                    />
                  </div>
                  <div className="relative">
                    <AlertCircle
                      className={`absolute left-3 top-3 ${darkMode ? "text-gray-400" : "text-gray-400"}`}
                      size={20}
                    />
                    <select className={`w-full pl-10 pr-4 py-2 border ${darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white"} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none appearance-none transition-colors`}>
                      <option value="">Nature of emergency</option>
                      <option value="cardiac">Cardiac Issue</option>
                      <option value="accident">Accident/Trauma</option>
                      <option value="breathing">Breathing Difficulty</option>
                      <option value="other">Other Medical Emergency</option>
                    </select>
                  </div>
                  <button
                    className={`w-full ${darkMode ? "bg-red-800 hover:bg-red-900" : "bg-red-600 hover:bg-red-700"} text-white py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center ${
                      pulseAnimation ? "animate-pulse" : ""
                    } transform hover:scale-[1.02]`}
                  >
                    <Ambulance size={20} className="mr-2" />
                    Request Ambulance Now
                  </button>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} text-center`}>
                    Average response time: 8-12 minutes
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                    Schedule Medical Transport
                  </h3>
                  <div className="relative">
                    <MapPin
                      className={`absolute left-3 top-3 ${darkMode ? "text-gray-400" : "text-gray-400"}`}
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Pickup location"
                      className={`w-full pl-10 pr-4 py-2 border ${darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white"} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors`}
                    />
                  </div>
                  <div className="relative">
                    <MapPin
                      className={`absolute left-3 top-3 ${darkMode ? "text-gray-400" : "text-gray-400"}`}
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Destination"
                      className={`w-full pl-10 pr-4 py-2 border ${darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white"} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors`}
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Calendar
                        className={`absolute left-3 top-3 ${darkMode ? "text-gray-400" : "text-gray-400"}`}
                        size={20}
                      />
                      <input
                        type="date"
                        className={`w-full pl-10 pr-4 py-2 border ${darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white"} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors`}
                      />
                    </div>
                    <div className="relative flex-1">
                      <Clock
                        className={`absolute left-3 top-3 ${darkMode ? "text-gray-400" : "text-gray-400"}`}
                        size={20}
                      />
                      <input
                        type="time"
                        className={`w-full pl-10 pr-4 py-2 border ${darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white"} rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors`}
                      />
                    </div>
                  </div>
                  <button className={`w-full ${darkMode ? "bg-red-800 hover:bg-red-900" : "bg-red-600 hover:bg-red-700"} text-white py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-[1.02]`}>
                    Schedule Transport
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Staggered Animation */}
      <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-white"} transition-colors duration-300`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? "text-white" : "text-gray-800"}`}>
            Our Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Emergency Response",
                description:
                  "24/7 rapid medical emergency response with trained paramedics and life-saving equipment.",
                icon: <AlertCircle size={40} className={darkMode ? "text-red-500" : "text-red-600"} />,
                delay: 100,
              },
              {
                title: "Medical Transport",
                description:
                  "Pre-scheduled non-emergency medical transportation with specialized care for patients.",
                icon: <Ambulance size={40} className={darkMode ? "text-red-500" : "text-red-600"} />,
                delay: 300,
              },
              {
                title: "GPS Tracking",
                description:
                  "Real-time ambulance tracking to know exactly when help will arrive.",
                icon: <Navigation size={40} className={darkMode ? "text-red-500" : "text-red-600"} />,
                delay: 500,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`${darkMode ? "bg-gray-700 hover:bg-gray-750 shadow-lg shadow-red-900/10" : "bg-gray-50 hover:shadow-lg"} p-6 rounded-xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${feature.delay}ms` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
                  {feature.title}
                </h3>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>{feature.description}</p>
                <Link
                  to="#"
                  className={`mt-4 inline-flex items-center ${darkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-800"} font-medium transition-colors`}
                >
                  Learn more <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section with Animation */}
      <section className={`py-16 ${darkMode ? "bg-gray-900" : "bg-gray-100"} transition-colors duration-300`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? "text-white" : "text-gray-800"}`}>
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Request",
                description: "Submit your location and emergency details",
                number: "1",
                icon: <Phone size={24} />
              },
              {
                title: "Dispatch",
                description: "Nearest ambulance is immediately notified",
                number: "2",
                icon: <Activity size={24} />
              },
              {
                title: "En Route",
                description: "Track the ambulance's arrival in real-time",
                number: "3",
                icon: <Navigation size={24} />
              },
              {
                title: "Care",
                description: "Receive prompt medical attention",
                number: "4",
                icon: <Heart size={24} />
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`relative text-center transition-all duration-700 ease-in-out ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`${darkMode ? "bg-red-800" : "bg-red-600"} text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto transition-transform duration-300 hover:scale-110`}>
                  {step.icon}
                </div>
                {index < 3 && (
                  <div className={`hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 ${darkMode ? "bg-red-900" : "bg-red-300"}`}></div>
                )}
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
                  {step.title}
                </h3>
                <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 ${darkMode ? "bg-gray-950 text-gray-300" : "bg-gray-200 text-gray-700"} transition-colors duration-300`}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Heart className={`${pulseAnimation ? "animate-pulse" : ""} ${darkMode ? "text-red-500" : "text-red-600"}`} size={24} />
            <span className="text-xl font-bold">MediResponse</span>
          </div>
          <p className="mb-4">Emergency medical services available 24/7</p>
          <div className="flex justify-center space-x-6 mb-6">
            <Link to="#" className={`${darkMode ? "hover:text-red-400" : "hover:text-red-600"} transition-colors`}>Terms</Link>
            <Link to="#" className={`${darkMode ? "hover:text-red-400" : "hover:text-red-600"} transition-colors`}>Privacy</Link>
            <Link to="#" className={`${darkMode ? "hover:text-red-400" : "hover:text-red-600"} transition-colors`}>Contact</Link>
            <Link to="#" className={`${darkMode ? "hover:text-red-400" : "hover:text-red-600"} transition-colors`}>Support</Link>
          </div>
          <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}>© 2025 MediResponse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;