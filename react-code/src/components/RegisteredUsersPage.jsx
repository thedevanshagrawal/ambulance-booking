import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Authentication/AuthContext";
import { motion } from "framer-motion";
import {
  Loader,
  Search,
  AlertCircle,
  RefreshCw,
  User,
  Mail,
  Shield,
  Download,
  UserPlus,
} from "lucide-react";

const RegisteredUsersPage = ({ darkMode }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/users/get-all-users`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(response.data.data);
        setError(null);
      } catch (err) {
        setError("Failed to load registered users.");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated, token]);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/users/get-all-users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to refresh user data.");
    } finally {
      setLoading(false);
    }
  };

  // Extract unique roles for filtering
  const uniqueRoles = ["all", ...new Set(users.map((user) => user.role))];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div
      className={`transition-colors duration-300 ${
        darkMode ? "text-gray-200" : "text-gray-800"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`rounded-full p-2 ${
              darkMode ? "bg-blue-600/20" : "bg-blue-100"
            }`}
          >
            <User
              size={24}
              className={darkMode ? "text-blue-400" : "text-blue-600"}
            />
          </motion.div>
          <h1
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Registered Users
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
          <div
            className={`relative flex-grow md:max-w-xs ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search
                size={18}
                className={darkMode ? "text-gray-400" : "text-gray-500"}
              />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 w-full rounded-lg transition-colors focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:ring-blue-500 text-white"
                  : "bg-white border-gray-300 focus:ring-blue-400"
              } border`}
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center px-4 py-2 rounded-lg border transition-colors ${
              darkMode
                ? `bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-200 ${
                    showFilters ? "bg-gray-600" : ""
                  }`
                : `bg-white border-gray-300 hover:bg-gray-100 text-gray-700 ${
                    showFilters ? "bg-gray-100" : ""
                  }`
            }`}
          >
            <Shield size={18} className="mr-2" />
            Filter by Role
          </button>

          <button
            onClick={handleRefresh}
            className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            <RefreshCw size={18} className="mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Role Filter */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={`mb-6 p-4 rounded-lg ${
            darkMode ? "bg-gray-700" : "bg-gray-50 border border-gray-200"
          }`}
        >
          <h3 className="font-medium mb-3">Filter by role:</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueRoles.map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  roleFilter === role
                    ? darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-800"
                    : darkMode
                    ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                    : "bg-white border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {role === "all" ? "All Roles" : role}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center py-12"
        >
          <Loader size={24} className="animate-spin mr-2 text-blue-500" />
          <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
            Loading user data...
          </span>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg mb-6 flex items-center ${
            darkMode ? "bg-red-900/30 text-red-200" : "bg-red-50 text-red-800"
          }`}
        >
          <AlertCircle size={20} className="mr-2 flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {!loading && !error && filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`flex flex-col items-center justify-center py-16 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <svg
            className="w-16 h-16 mb-4 opacity-30"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-xl font-medium mb-2">No users found</p>
          <p className="text-sm">
            {searchTerm || roleFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "No registered users are currently available in the system"}
          </p>
        </motion.div>
      )}

      {!loading && !error && filteredUsers.length > 0 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={tableVariants}
          className={`rounded-lg overflow-hidden shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className={`border-b ${
                    darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <th
                    className={`p-4 text-left ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <User size={16} className="mr-2 opacity-70" />
                      Full Name
                    </div>
                  </th>
                  <th
                    className={`p-4 text-left ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <Mail size={16} className="mr-2 opacity-70" />
                      Email
                    </div>
                  </th>
                  <th
                    className={`p-4 text-left ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <Shield size={16} className="mr-2 opacity-70" />
                      Role
                    </div>
                  </th>
                  <th
                    className={`p-4 text-left ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    variants={rowVariants}
                    className={`border-b ${
                      darkMode
                        ? "border-gray-700 hover:bg-gray-700/50"
                        : "border-gray-200 hover:bg-gray-50"
                    } transition-colors`}
                  >
                    <td
                      className={`p-4 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center ${
                            darkMode ? "bg-gray-700" : "bg-gray-100"
                          }`}
                        >
                          <span className="font-medium text-sm">
                            {user.fullName?.charAt(0)?.toUpperCase() || "?"}
                          </span>
                        </div>
                        {user.fullName}
                      </div>
                    </td>
                    <td
                      className={`p-4 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {user.email}
                    </td>
                    <td className={`p-4`}>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getRoleColorClasses(
                          user.role,
                          darkMode
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td
                      className={`p-4 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <div className="flex space-x-2">
                        <button
                          className={`p-1 rounded hover:bg-opacity-80 ${
                            darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
                          }`}
                          title="View details"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          className={`p-1 rounded hover:bg-opacity-80 ${
                            darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
                          }`}
                          title="Edit user"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className={`p-4 flex justify-between items-center border-t ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className={darkMode ? "text-gray-400" : "text-gray-500"}>
              Showing{" "}
              <span className="font-medium">{filteredUsers.length}</span> of{" "}
              <span className="font-medium">{users.length}</span> users
            </div>

            <div className="flex space-x-2">
              <button
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <Download size={18} className="mr-2" />
                Export
              </button>

              <button
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                <UserPlus size={18} className="mr-2" />
                Add User
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const getRoleColorClasses = (role, darkMode) => {
  if (darkMode) {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-purple-600 text-purple-100";
      case "doctor":
        return "bg-blue-600 text-blue-100";
      case "nurse":
        return "bg-green-600 text-green-100";
      case "patient":
        return "bg-yellow-500 text-yellow-100";
      default:
        return "bg-gray-600 text-gray-100";
    }
  } else {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "doctor":
        return "bg-blue-100 text-blue-800";
      case "nurse":
        return "bg-green-100 text-green-800";
      case "patient":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }
};

export default RegisteredUsersPage;
