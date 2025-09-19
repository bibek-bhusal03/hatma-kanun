import React from "react";
import { FaUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";

const Header = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full flex items-center justify-around text-white bg-[#0055A4] text-[20px] px-2 py-2">
      <div className="flex items-center justify-center p-1 hover:opacity-60 cursor-pointer rounded-full bg-">
        <FaUser />
      </div>
      <div className="flex items-center justify-center p-1 hover:opacity-60 cursor-pointer rounded-full bg-">
        <IoHomeOutline />
      </div>
      <div className="flex items-center justify-center p-1 hover:opacity-60 cursor-pointer rounded-full bg-">
        <IoSettingsOutline />
      </div>
      <div className="flex items-center justify-center p-1 hover:opacity-60 cursor-pointer rounded-full bg-">
        <LuMapPin />
      </div>
    </div>
  );
};

export default Header;
