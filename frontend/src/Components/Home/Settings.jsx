import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail, MdPhone, MdLanguage } from "react-icons/md";

const Settings = () => {
  const [user, setUser] = useState({
    name: "Arun Sharma",
    email: "arun.sharma@example.com",
    phone: "+977-9801234567",
    language: "English",
    profileImage: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(formData); // Update dummy data
    setIsEditing(false);
  };

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
          <div className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm">
            <MdPhone className="text-green-500 w-6 h-6 mr-3" />
            <div>
              <p className="text-xs text-gray-500">Phone Number</p>
              <p className="text-gray-800 font-medium">{user.phone}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm">
            <MdEmail className="text-red-500 w-6 h-6 mr-3" />
            <div>
              <p className="text-xs text-gray-500">Email Address</p>
              <p className="text-gray-800 font-medium">{user.email}</p>
            </div>
          </div>

          {/* Language */}
          <div className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm">
            <MdLanguage className="text-purple-500 w-6 h-6 mr-3" />
            <div>
              <p className="text-xs text-gray-500">Preferred Language</p>
              <p className="text-gray-800 font-medium">{user.language}</p>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-6 text-center">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
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
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-2 border rounded-lg"
              />
              <select
                name="language"
                value={formData.language}
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
                value={formData.profileImage}
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
