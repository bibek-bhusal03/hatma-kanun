import React from "react";
import { MdHome } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed bottom-0 left-2 right-2 flex items-center justify-around text-[#374151] bg-[#ffffff] text-[20px] px-2 py-2 rounded-xl text-sm border-1 border-gray-500/50">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center ${
            isActive ? "text-blue-600" : "text-gray-700"
          }`
        }
      >
        <div className="flex justify-center p-2  rounded-full items-center cursor-pointer">
          <MdHome style={{ fontSize: "30px" }} />
        </div>
        <p className="text-sm">Home</p>
      </NavLink>
      <NavLink
        to="/reports"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center ${
            isActive ? "text-blue-600" : "text-gray-700"
          }`
        }
      >
        <div className="flex justify-center p-2 rounded-full items-center cursor-pointer">
          <IoNotifications style={{ fontSize: "30px" }} />
        </div>
        <p className="text-sm">Reports</p>
      </NavLink>
      <NavLink
        to="/calls"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center fixed bottom-7 z-20 ${
            isActive ? "text-blue-600" : "text-gray-700"
          }`
        }
      >
        <div className="flex flex-col justify-center items-center rounded-full bg-red-500 text-white cursor-pointer  p-4 border-1 border-t-0 border-gray-900/90">
          <IoCall style={{ fontSize: "30px" }} />
        </div>
        <p className="text-sm">Call</p>
      </NavLink>
      <div className="flex flex-col items-center justify-center">
        <div className="invisible">
          <IoCall style={{ fontSize: "30px" }} />
        </div>
      </div>
      <NavLink
        to="/map"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center ${
            isActive ? "text-blue-600" : "text-gray-700"
          }`
        }
      >
        <div className="flex justify-center p-2 rounded-full items-center cursor-pointer">
          <FaMapLocationDot style={{ fontSize: "30px" }} />
        </div>
        <p className="text-sm">Map</p>
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center ${
            isActive ? "text-blue-600" : "text-gray-700"
          }`
        }
      >
        <div className="flex justify-center p-2 rounded-full items-center cursor-pointer">
          <IoSettingsSharp style={{ fontSize: "30px" }} />
        </div>
        <p className="text-sm">Setting</p>
      </NavLink>
    </div>
  );
};

export default Navbar;
