import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Authentication/AuthContext";
import Cookies from "js-cookie";
import {
  Heart,
  Mail,
  Lock,
  EyeOff,
  Eye,
  ArrowRight,
  Moon,
  Sun,
} from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Check system preference for dark mode on load
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);

    setIsLoaded(true);

    // Create a pulse animation interval for the logo
    const pulseInterval = setInterval(() => {
      setPulseAnimation((prev) => !prev);
    }, 2000);

    return () => clearInterval(pulseInterval);
  }, []);

  // Apply dark mode to document body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        formData,
        { withCredentials: true }
      );

      const { accessToken, loggedInUser } = response.data.data;

      Cookies.set("accessToken", accessToken, {
        secure: true,
        expires: 1,
        path: "/",
      });

      login(accessToken);

      // Add a slight delay for visual feedback
      setTimeout(() => {
        if (loggedInUser.role === "admin") {
          navigate("/admin-dashboard");
        } else if (loggedInUser.role === "user") {
          navigate("/user-dashboard");
        }
      }, 500);
    } catch (error) {
      console.error("Login Error:", error);
      setFormErrors({ general: "Invalid credentials. Please try again." });
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Header */}
      <header
        className={`${
          darkMode ? "bg-red-900" : "bg-red-600"
        } transition-all duration-500 ease-in-out py-4 px-6`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart
              className={`${pulseAnimation ? "animate-pulse" : ""} text-white`}
              size={24}
            />
            <span className="text-xl font-bold text-white">MediResponse</span>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-white p-2 rounded-full hover:bg-red-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <div className="flex flex-grow items-center justify-center p-4">
        <div
          className={`w-full max-w-md transition-all duration-1000 ease-in-out ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className={`${
              darkMode
                ? "bg-gray-800 shadow-xl shadow-red-900/20"
                : "bg-white shadow-lg"
            } p-8 rounded-2xl transition-all duration-300`}
          >
            <div className="text-center mb-8">
              <div className="inline-flex justify-center items-center mb-4">
                <Heart
                  className={`${darkMode ? "text-red-500" : "text-red-600"} ${
                    pulseAnimation ? "animate-pulse" : ""
                  }`}
                  size={32}
                />
              </div>
              <h2
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Welcome Back
              </h2>
              <p
                className={`mt-2 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Sign in to your account
              </p>
            </div>

            {formErrors.general && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800">
                {formErrors.general}
              </div>
            )}

            <div className="space-y-6">
              <div className="relative">
                <Mail
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-white focus:border-red-500"
                      : "border-gray-300 bg-white focus:border-red-500"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-colors`}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <Lock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className={`w-full pl-10 pr-12 py-3 border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-white focus:border-red-500"
                      : "border-gray-300 bg-white focus:border-red-500"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode
                      ? "text-gray-400 hover:text-gray-200"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.password}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <a
                  href="#"
                  className={`text-sm ${
                    darkMode
                      ? "text-red-400 hover:text-red-300"
                      : "text-red-600 hover:text-red-800"
                  } transition-colors`}
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  darkMode
                    ? "bg-red-800 hover:bg-red-900"
                    : "bg-red-600 hover:bg-red-700"
                } text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "transform hover:scale-[1.02]"
                }`}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                ) : (
                  <>
                    Sign In <ArrowRight size={18} className="ml-2" />
                  </>
                )}
              </button>

              <div className="text-center pt-4">
                <span
                  className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Don't have an account?{" "}
                </span>
                <Link
                  to="/register"
                  className={`${
                    darkMode
                      ? "text-red-400 hover:text-red-300"
                      : "text-red-600 hover:text-red-800"
                  } font-semibold transition-colors`}
                >
                  Create account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`py-4 ${
          darkMode ? "bg-gray-950 text-gray-400" : "bg-gray-200 text-gray-600"
        } transition-colors duration-300`}
      >
        <div className="container mx-auto text-center text-sm">
          <p>© 2025 MediResponse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
