import React, { useState, useEffect } from "react";
import { User, Mail, Edit2, Save, X } from "lucide-react";

const UserProfile = () => {
  const [profile, setProfile] = useState({ fullName: "", email: "", role: "" });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    const token = localStorage.getItem("sessionToken");
    try {
      const response = await fetch(
        "http://localhost:3000/api/users/current-user",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setProfile(data.data);
      setFormData({ fullName: data.data.fullName, email: data.data.email });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/users/current-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
        },
        body: JSON.stringify(formData),
      });
      setProfile(formData);
      setEditMode(false);
      // Use a toast notification instead of alert
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-pulse flex flex-col items-center p-8 bg-white rounded-xl shadow-lg w-96">
          <div className="h-24 w-24 bg-gray-200 rounded-full mb-6"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="h-10 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-2xl font-bold">User Profile</h1>
          <p className="text-blue-100">Manage your account information</p>
        </div>

        {!editMode ? (
          <div className="p-6">
            <div className="flex justify-center mb-6">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold">
                {profile.fullName.charAt(0)}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <User className="text-gray-500 mr-3" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Full Name</p>
                  <p className="text-gray-800 font-medium">
                    {profile.fullName}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Mail className="text-gray-500 mr-3" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Email</p>
                  <p className="text-gray-800">{profile.email}</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <svg
                  className="text-gray-500 mr-3"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Role</p>
                  <p className="text-gray-800 capitalize">{profile.role}</p>
                </div>
              </div>
            </div>

            <button
              className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
              onClick={() => setEditMode(true)}
            >
              <Edit2 size={18} className="mr-2" />
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Your Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <Save size={18} className="mr-2" />
                  Save Changes
                </button>
                <button
                  type="button"
                  className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                  onClick={() => setEditMode(false)}
                >
                  <X size={18} className="mr-2" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
