import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import axios from "axios";
import {
  AlertCircle,
  Ambulance,
  Calendar,
  Clock,
  MapPin,
  User,
  FileText,
  ArrowRight,
  Phone,
  LogOut,
  Home,
  UserCircle,
  Menu,
  X,
} from "lucide-react";

const AmbulanceBookingForm = ({ showAlert }) => {
  const { token, logout } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    appointmentDate: "",
    appointmentTime: "",
    emergencyType: "",
    pickupLocation: "",
    destination: "",
    additionalInfo: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, appointmentDate: today }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
      setIsLoading(false);
    }, 300);
  };

  const prevStep = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentStep(currentStep - 1);
      setIsLoading(false);
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/ambulance/register-ambulance-booking",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status !== 201) {
        throw new Error("Server response was not ok");
      }

     
      setFormData({
        patientName: "",
        appointmentDate: new Date().toISOString().split("T")[0],
        appointmentTime: "",
        emergencyType: "",
        pickupLocation: "",
        destination: "",
        additionalInfo: "",
      });
      setCurrentStep(1);
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmergencyCall = () => {
    showAlert("Calling emergency services at 911...", "info");
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/users/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      logout();
    } catch (error) {
      showAlert("Logout failed. Please try again.", "danger");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToProfile = () => {
    showAlert("Navigating to profile...", "info");
    setIsMenuOpen(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div
            className={`transition-all duration-500 ${
              isLoading ? "opacity-0 translate-x-8" : "opacity-100"
            }`}
          >
            <h3 className="text-lg font-medium mb-4 text-gray-200">
              Patient Information
            </h3>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="patientName"
                  placeholder="Patient Name"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white placeholder-gray-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Calendar className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white"
                  />
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <AlertCircle className="w-4 h-4 text-gray-400" />
                </div>
                <select
                  name="emergencyType"
                  className="w-full pl-10 pr-4 py-2 borde border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none appearance-none transition-colors"
                  onChange={handleChange}
                  value={formData.emergencyType}
                >
                  <option value="">Nature of emergency</option>
                  <option value="cardiac">Cardiac Issue</option>
                  <option value="accident">Accident/Trauma</option>
                  <option value="breathing">Breathing Difficulty</option>
                  <option value="other">Other Medical Emergency</option>
                </select>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <AlertCircle className="w-4 h-4 text-gray-400" />
                </div>
                <select
                  name="preferredAmbulanceType"
                  className="w-full pl-10 pr-4 py-2 borde border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none appearance-none transition-colors"
                  onChange={handleChange}
                  value={formData.preferredAmbulanceType}
                >
                  <option value="">Ambulance type</option>
                  <option value="basic-life-support">Basic Life Support</option>
                  <option value="advanced-life-support">
                    Advanced Life Support
                  </option>
                  <option value="icu">ICU</option>
                  <option value="private-ambulance">Private Ambulance</option>
                  <option value="102-Janani-Express-for-Pregnant-Women-&-Infants">
                    102 Janani Express for Pregnant Women & Infants
                  </option>
                  <option value="Disaster-Managment-Ambulance">
                    Disaster Managment Ambulance
                  </option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
              >
                Next <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div
            className={`transition-all duration-500 ${
              isLoading ? "opacity-0 translate-x-8" : "opacity-100"
            }`}
          >
            <h3 className="text-lg font-medium mb-4 text-gray-200">
              Location Details
            </h3>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="pickupLocation"
                  placeholder="Pickup Location"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white placeholder-gray-400"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="destination"
                  placeholder="Destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white placeholder-gray-400"
                />
              </div>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FileText className="w-4 h-4 text-gray-400" />
                </div>
                <textarea
                  name="additionalInfo"
                  placeholder="Additional Information"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-32 text-white placeholder-gray-400"
                ></textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center px-6 py-3 ${
                  isSubmitting ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
                } text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Booking...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Book Ambulance <Ambulance className="ml-2 w-4 h-4" />
                  </span>
                )}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div className="flex items-center py-4">
                <Ambulance className="h-6 w-6 mr-2 text-blue-500" />
                <span className="font-bold text-xl">MedEmergency</span>
              </div>

              <div className="hidden md:flex items-center space-x-1">
                <a
                  href="#"
                  className="py-4 px-3 text-gray-300 hover:text-blue-500 transition duration-300"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="py-4 px-3 text-blue-500 border-b-2 border-blue-500 font-semibold"
                >
                  Book Ambulance
                </a>
                <a
                  href="#"
                  className="py-4 px-3 text-gray-300 hover:text-blue-500 transition duration-300"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="py-4 px-3 text-gray-300 hover:text-blue-500 transition duration-300"
                >
                  Contact
                </a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <Link to="/profile">
                <button
                  onClick={goToProfile}
                  className="py-2 px-3 flex items-center text-gray-300 hover:text-blue-500 transition duration-300"
                >
                  <UserCircle className="mr-1 h-5 w-5" />
                  Profile
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="py-2 px-3 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded transition duration-300 flex items-center"
              >
                <LogOut className="mr-1 h-4 w-4" />
                Logout
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="mobile-menu-button p-2 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } transition-all duration-300 ease-in-out`}
        >
          <a
            href="#"
            className="block py-3 px-4 text-gray-300 hover:bg-gray-700 transition duration-300"
          >
            Home
          </a>
          <a
            href="#"
            className="block py-3 px-4 text-blue-500 bg-gray-700 font-semibold"
          >
            Book Ambulance
          </a>
          <a
            href="#"
            className="block py-3 px-4 text-gray-300 hover:bg-gray-700 transition duration-300"
          >
            Services
          </a>
          <a
            href="#"
            className="block py-3 px-4 text-gray-300 hover:bg-gray-700 transition duration-300"
          >
            Contact
          </a>
          <button
            onClick={goToProfile}
            className="block w-full text-left py-3 px-4 text-gray-300 hover:bg-gray-700 transition duration-300"
          >
            <div className="flex items-center">
              <UserCircle className="mr-2 h-5 w-5" />
              Profile
            </div>
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left py-3 px-4 text-gray-300 hover:bg-gray-700 transition duration-300"
          >
            <div className="flex items-center">
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </div>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-lg mx-auto my-8 bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6">
          <div className="flex items-center text-white">
            <Ambulance className="w-8 h-8 mr-3" />
            <h2 className="text-2xl font-bold">Book an Ambulance</h2>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  currentStep >= 1 ? "bg-blue-600" : "bg-gray-600"
                } text-white text-sm font-medium transition-colors`}
              >
                1
              </div>
              <div
                className={`flex-1 h-1 mx-2 ${
                  currentStep >= 2 ? "bg-blue-600" : "bg-gray-600"
                } transition-colors`}
              ></div>
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  currentStep >= 2 ? "bg-blue-600" : "bg-gray-600"
                } text-white text-sm font-medium transition-colors`}
              >
                2
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>{renderStep()}</form>
        </div>

        <div className="bg-gray-700 p-4 border-t border-gray-600">
          <button
            onClick={handleEmergencyCall}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
          >
            <Phone className="w-5 h-5" /> Call Emergency (911)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceBookingForm;
