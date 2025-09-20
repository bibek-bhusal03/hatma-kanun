import React, { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";
import { X } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "RTI Approved",
      message:
        "Your RTI for the 'Road Construction in Ward 5' has been approved.",
      date: "2025-09-18",
      read: false,
    },
    {
      id: 2,
      title: "Phone Number Updated",
      message:
        "Your phone number has been successfully updated in your profile.",
      date: "2025-09-17",
      read: false,
    },
    {
      id: 3,
      title: "e-Sifaris Approved",
      message:
        "Your e-Sifaris application for land registration has been approved.",
      date: "2025-09-16",
      read: true,
    },
  ]);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mark single notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Unread count for badge
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-3 flex items-center justify-between rounded-xl mx-3 my-1 border">
      {/* Left (user info) */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-400 rounded-full p-2.5 flex items-center justify-center">
          <FaUser style={{ fontSize: "20px", color: "white" }} />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <p className="text-[14px] text-gray-600/80">Hello,</p>
          <p>Arun Neupane</p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 relative" ref={dropdownRef}>
        {/* Notifications Button */}
        <button
          className="flex items-center px-2 py-2 bg-gray-400/60 cursor-pointer rounded-full relative"
          onClick={() => setOpen(!open)}
        >
          <IoIosNotifications style={{ fontSize: "25px" }} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Globe Button */}
        <button className="flex items-center px-2 py-2 bg-gray-400/60 cursor-pointer rounded-full">
          <CiGlobe style={{ fontSize: "25px" }} />
        </button>

        {/* Popup */}
        {open && (
          <div className="absolute right-0 top-12 w-80 bg-white shadow-xl rounded-xl border overflow-hidden z-50">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                Notifications
              </h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-5 py-3 border-b cursor-pointer transition ${
                      !n.read
                        ? "bg-blue-50 hover:bg-blue-100"
                        : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => markAsRead(n.id)}
                  >
                    <div className="flex items-start gap-3">
                      {!n.read ? (
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-500 mt-2 "></span>
                      ) : (
                        <span className="h-2.5 w-2.5 rounded-full bg-gray-300 mt-2"></span>
                      )}
                      <div
                        className={`pl-2 rounded-lg border-l-2 border-blue-400 ${
                          !n.read ? "border-blue-400" : "border-white"
                        }`}
                      >
                        <p className="font-medium text-gray-800">{n.title}</p>
                        <p className="text-sm text-gray-600">{n.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.date}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-6">
                  No new notifications
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
