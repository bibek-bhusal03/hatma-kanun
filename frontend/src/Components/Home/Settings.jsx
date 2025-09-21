import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail, MdPhone, MdLanguage } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { useLocalGovStore } from "../../stores/localGovStore";
import { useAuthStore } from "../../stores/authStore";
import { NavLink } from "react-router-dom";

const Settings = () => {
  const { localGov } = useLocalGovStore();
  const { user, logout } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || {});

  // Handle edit form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save (for now, just local update)
  const handleSave = () => {
    // Here you would send updated data to backend
    setIsEditing(false);
  };

  // If user is not logged in → show Sign In button
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg">
          {/* Motivating Text */}
          <NavLink to="/" className="flex items-center justify-center">
            <img
              src="/logo/logo-full.png" // Replace with your actual logo path
              alt="Logo"
              className="h-12 w-auto mb-6"
            />
          </NavLink>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome Back to Progress
          </h1>
          <p className="text-gray-600 text-sm mb-8">
            Empower your community. Track budgets, report issues, and stay
            informed — all in one place.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signin"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg shadow hover:bg-gray-200 transition"
            >
              Sign Up
            </a>
            <a
              href="/admin"
              className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg shadow hover:bg-gray-200 transition"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6 pb-25">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center border-b pb-6">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
            />
          ) : (
            <FaUserCircle className="text-gray-400 w-24 h-24" />
          )}
          <h2 className="mt-3 text-xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm flex items-center justify-center">
            <SlLocationPin className="mr-1" />
            {localGov || "Detecting your local government..."}
          </p>
        </div>

        {/* User Information */}
        <div className="mt-6 space-y-4">
          {/* Name */}
          <div className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm">
            <FaUserCircle className="text-blue-500 w-6 h-6 mr-3" />
            <div>
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="text-gray-800 font-medium">{user.name}</p>
            </div>
          </div>

          {/* Phone */}
          {user.phone && (
            <div className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm">
              <MdPhone className="text-green-500 w-6 h-6 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Phone Number</p>
                <p className="text-gray-800 font-medium">{user.phone}</p>
              </div>
            </div>
          )}

          {/* Email */}
          <div className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm">
            <MdEmail className="text-red-500 w-6 h-6 mr-3" />
            <div>
              <p className="text-xs text-gray-500">Email Address</p>
              <p className="text-gray-800 font-medium">{user.email}</p>
            </div>
          </div>

          {/* Language */}
          {user.language && (
            <div className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm">
              <MdLanguage className="text-purple-500 w-6 h-6 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Preferred Language</p>
                <p className="text-gray-800 font-medium">{user.language}</p>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
          <button
            className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-2 border rounded-lg"
              />
              <select
                name="language"
                value={formData.language || "English"}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option>English</option>
                <option>Nepali</option>
                <option>Hindi</option>
              </select>
              <input
                type="text"
                name="profileImage"
                value={formData.profileImage || ""}
                onChange={handleChange}
                placeholder="Profile Image URL"
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
