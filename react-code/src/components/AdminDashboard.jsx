import React, { useState, useEffect } from "react";
import Bookings from "./Bookings";
import RegisteredUsersPage from "./RegisteredUsersPage";
import { useAuth } from "../Authentication/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Users, Calendar } from "lucide-react";

const AdminDashboard = () => {
  const { isAuthenticated, token } = useAuth();
  const [activeTab, setActiveTab] = useState("bookings");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preferences for dark mode
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);

    // Check authentication status
    console.log("Auth State:", isAuthenticated, "Token from useAuth:", token);
    if (isAuthenticated !== null) {
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (loading) {
    return (
      <div
        className={`flex h-screen items-center justify-center ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-xl font-medium ${
            darkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 animate-pulse rounded-full bg-blue-500"></div>
            <span>Checking authentication...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated || !token) {
    return (
      <div
        className={`flex h-screen items-center justify-center ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-lg border ${
            darkMode
              ? "border-red-800 bg-gray-800 text-red-400"
              : "border-red-200 bg-white text-red-600"
          } p-6 shadow-lg`}
        >
          <h2 className="mb-2 text-xl font-bold">Unauthorized Access</h2>
          <p>Please log in to access the admin dashboard.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`flex h-screen flex-col transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Top Navigation Bar */}
      <div
        className={`fixed top-0 z-40 flex w-full items-center justify-between px-4 py-3 ${
          darkMode ? "bg-gray-800 shadow-md" : "bg-white shadow-sm"
        }`}
      >
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`mr-4 rounded-md p-2 ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            } sm:hidden`}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className={`rounded-full p-2 ${
            darkMode
              ? "bg-gray-700 text-yellow-300"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="mt-16 flex flex-grow">
        {/* Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth >= 640) && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed z-30 h-screen w-64 ${
                darkMode
                  ? "bg-gray-800 text-white shadow-lg shadow-gray-900/20"
                  : "bg-white text-gray-800 shadow-lg"
              } sm:relative`}
            >
              <div className="p-6 text-lg font-bold border-b border-gray-700 flex justify-between items-center">
                <span>Admin Panel</span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="sm:hidden text-gray-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="flex-grow">
                <ul className="space-y-1 p-4">
                  <motion.li
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <button
                      onClick={() => setActiveTab("bookings")}
                      className={`flex w-full items-center space-x-3 rounded-md px-4 py-3 text-left transition-colors ${
                        activeTab === "bookings"
                          ? darkMode
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-700"
                          : darkMode
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <Calendar size={18} />
                      <span>Bookings</span>
                    </button>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <button
                      onClick={() => setActiveTab("registered-user")}
                      className={`flex w-full items-center space-x-3 rounded-md px-4 py-3 text-left transition-colors ${
                        activeTab === "registered-user"
                          ? darkMode
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-700"
                          : darkMode
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <Users size={18} />
                      <span>Users</span>
                    </button>
                  </motion.li>
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`flex-grow overflow-auto p-6 transition-all ${
            darkMode ? "bg-gray-900" : "bg-gray-50"
          } }`}
        >
          <div
            className={`rounded-lg ${
              darkMode ? "bg-gray-800 shadow-md" : "bg-white shadow-sm"
            } p-6`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "bookings" && <Bookings darkMode={darkMode} />}
                {activeTab === "registered-user" && (
                  <RegisteredUsersPage darkMode={darkMode} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
