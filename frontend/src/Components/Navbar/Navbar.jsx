import React from "react";
import { MdHome } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

const Header = () => {
  return (
    <div className="fixed bottom-1 left-2 right-2 flex items-center justify-around text-[#374151] bg-[#ffffff] text-[20px] px-2 py-4 rounded-xl text-sm border-1 border-gray-500/50">
      <div className="items-cent4er flex justify-center p-2 rounded-full items-center cursor-pointer">
        <MdHome style={{ fontSize: "25px" }} />
      </div>
      <div className="items-cent4er flex justify-center p-2 rounded-full items-center cursor-pointer">
        <IoNotifications style={{ fontSize: "25px" }} />
      </div>
      <div className="flex justify-center items-center rounded-full bg-red-500 text-white cursor-pointer fixed bottom-10 z-20 p-4 border-1 border-t-0 border-gray-900/90">
        <IoCall style={{ fontSize: "25px" }} />
      </div>
      <div></div>
      <div className="items-cent4er flex justify-center p-2 rounded-full items-center cursor-pointer">
        <FaMapLocationDot style={{ fontSize: "25px" }} />
      </div>
      <div className="items-cent4er flex justify-center p-2 rounded-full items-center cursor-pointer">
        <IoSettingsOutline style={{ fontSize: "25px" }} />
      </div>
    </div>
  );
};

export default Header;
