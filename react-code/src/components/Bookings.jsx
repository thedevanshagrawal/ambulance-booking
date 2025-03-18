import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Authentication/AuthContext";
import { motion } from "framer-motion";
import {
  Loader,
  Search,
  AlertCircle,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Bookings = ({ darkMode }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtering, setFiltering] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/ambulance/get-all-ambulane-booking-details`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookings(response.data.data);
        setError(null);
      } catch (err) {
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated, token]);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/ambulance/get-all-ambulane-booking-details`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookings(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to refresh bookings.");
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.userFullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.patientMobile?.includes(searchTerm) ||
      booking.pickupLocation
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.destination?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.isAprroved === statusFilter;

    return matchesSearch && matchesStatus;
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

  return (
    <div
      className={`transition-colors duration-300 ${
        darkMode ? "text-gray-200" : "text-gray-800"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1
          className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-gray-800"
          } mb-4 md:mb-0`}
        >
          Ambulance Bookings
        </h1>

        <div className="flex flex-col sm:flex-row gap-3">
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
              placeholder="Search bookings..."
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
            onClick={() => setFiltering(!filtering)}
            className={`inline-flex items-center px-4 py-2 rounded-lg border transition-colors ${
              darkMode
                ? "bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-200"
                : "bg-white border-gray-300 hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Filter size={18} className="mr-2" />
            Filter
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

      {filtering && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={`mb-6 p-4 rounded-lg ${
            darkMode ? "bg-gray-700" : "bg-gray-50 border border-gray-200"
          }`}
        >
          <h3 className="font-medium mb-3">Filter by status:</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-md transition-colors ${
                statusFilter === "all"
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-800"
                  : darkMode
                  ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                  : "bg-white border border-gray-300 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-4 py-2 rounded-md transition-colors ${
                statusFilter === "pending"
                  ? darkMode
                    ? "bg-yellow-500 text-white"
                    : "bg-yellow-100 text-yellow-800"
                  : darkMode
                  ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                  : "bg-white border border-gray-300 hover:bg-gray-100"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter("completed")}
              className={`px-4 py-2 rounded-md transition-colors ${
                statusFilter === "completed"
                  ? darkMode
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-800"
                  : darkMode
                  ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                  : "bg-white border border-gray-300 hover:bg-gray-100"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setStatusFilter("cancelled")}
              className={`px-4 py-2 rounded-md transition-colors ${
                statusFilter === "cancelled"
                  ? darkMode
                    ? "bg-red-600 text-white"
                    : "bg-red-100 text-red-800"
                  : darkMode
                  ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                  : "bg-white border border-gray-300 hover:bg-gray-100"
              }`}
            >
              Cancelled
            </button>
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
            Loading bookings...
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

      {!loading && !error && filteredBookings.length === 0 && (
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
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-xl font-medium mb-2">No bookings found</p>
          <p className="text-sm">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "No bookings are currently available in the system"}
          </p>
        </motion.div>
      )}

      {!loading && !error && filteredBookings.length > 0 && (
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
                    Registered User
                  </th>
                  <th
                    className={`p-4 text-left ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Patient Name
                  </th>
                  <th
                    className={`p-4 text-left ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Mobile No.
                  </th>
                  <th
                    className={`p-4 text-left ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Emergency Type
                  </th>
                  <th
                    className={`p-4 text-left ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Pickup Location
                  </th>
                  <th
                    className={`p-4 text-left ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Destination
                  </th>
                  <th
                    className={`p-4 text-left ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Date & Time
                  </th>
                  <th
                    className={`p-4 text-left ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Ambulance Type
                  </th>
                  <th
                    className={`p-4 text-left ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => (
                  <motion.tr
                    key={booking._id}
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
                      {booking.userFullName}
                    </td>
                    <td
                      className={`p-4 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {booking.patientName}
                    </td>
                    <td
                      className={`p-4 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {booking.patientMobile}
                    </td>
                    <td
                      className={`p-4 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {booking.emergencyType}
                    </td>
                    <td
                      className={`p-4 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {booking.pickupLocation}
                    </td>
                    <td
                      className={`p-4 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {booking.destination}
                    </td>
                    <td
                      className={`p-4 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {`${booking.appointmentDate} ${booking.appointmentTime}`}
                    </td>
                    <td
                      className={`p-4 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {booking.preferredAmbulanceType}
                    </td>
                    <td className={`p-4`}>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColorClasses(
                          booking.isAprroved,
                          darkMode
                        )}`}
                      >
                        {booking.isAprroved}
                      </span>
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
              <span className="font-medium">{filteredBookings.length}</span> of{" "}
              <span className="font-medium">{bookings.length}</span> bookings
            </div>

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
          </div>
        </motion.div>
      )}
    </div>
  );
};

const getStatusColorClasses = (status, darkMode) => {
  if (darkMode) {
    switch (status) {
      case "completed":
        return "bg-green-600 text-green-100";
      case "pending":
        return "bg-yellow-500 text-yellow-100";
      case "cancelled":
        return "bg-red-600 text-red-100";
      default:
        return "bg-gray-600 text-gray-100";
    }
  } else {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }
};

export default Bookings;
