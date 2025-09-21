import React, { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";
import { X } from "lucide-react";
import { useLocalGovStore } from "../../stores/localGovStore";
import { SlLocationPin } from "react-icons/sl";

const Header = () => {
  const { localGov } = useLocalGovStore();
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
    <div className="py-3 flex items-center justify-between mx-3 my-1 border-b-1">
      {/* Left (user info) */}
      <div className="flex items-center gap-2 px-3">
        <div className="bg-blue-400 rounded-full p-2.5 flex items-center justify-center">
          <FaUser style={{ fontSize: "25px", color: "white" }} />
        </div>

        <div className="flex flex-col justify-center gap-0">
          <p className="text-[12px] text-gray-600/80">Hello,</p>
          <p className="text-lg">Arun</p>
        </div>
      </div>

      <div>
        <p className="text-md flex items-center justify-center">
          <SlLocationPin /> {localGov || "Detecting your local government..."}
        </p>
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
          <div className="absolute right-0 top-12 w-80 bg-white shadow-2xl rounded-xl border border-gray-200 overflow-hidden z-50">
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">
                Notifications
              </h3>
              <div className="flex items-center gap-3">
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
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-5 py-4 cursor-pointer transition ${
                      !n.read
                        ? "bg-blue-50 hover:bg-blue-100"
                        : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => markAsRead(n.id)}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`h-2.5 w-2.5 rounded-full mt-2 ${
                          !n.read ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      ></span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{n.title}</p>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {n.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{n.date}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center text-gray-500 text-sm">
                  No new notifications
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
