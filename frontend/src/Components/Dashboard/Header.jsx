import React from "react";
import { FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";

const Header = () => {
  return (
    <div className="p-3 flex items-center justify-between rounded-xl  mx-3 my-1 border-1">
      <div className="flex items-center gap-2">
        <div className="bg-blue-400 rounded-full p-2.5 flex items-center justify-center">
          <FaUser style={{ fontSize: "20px", color: "white" }} />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <p className="text-[14px] text-gray-600/80">Hello,</p>
          <p>Arun Neupane</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center px-2 py-2  bg-gray-400/60 cursor-pointer rounded-full">
          <IoIosNotifications style={{ fontSize: "20px" }} />
        </button>
        <button className="flex items-center px-2 py-2  bg-gray-400/60 cursor-pointer rounded-full">
          <CiGlobe style={{ fontSize: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default Header;
