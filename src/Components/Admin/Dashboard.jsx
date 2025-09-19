import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";

const Dashboard = () => {
  const [showDistricts, setShowDistrict] = useState(false);
  const [showCentralized, setShowCentralized] = useState(true);

  return (
    <div>
      <div
        className={`flex-col bg-gray-400/80 flex justify-between py-2 px-3 text-black
        ${showDistricts ? "flex" : "hidden"}
        `}
      >
        <div>Districts</div>
        <div>Municipality</div>
        <div>Ward</div>
        <div>Tole</div>
      </div>

      <div className="bg-blue-500 flex justify-between py-2 px-3 text-white">
        <p>Date</p>
        <p>Time</p>
        <p>Admin Dashboard</p>
        <div>
          <p>Lumbini</p>
        </div>
        <RxHamburgerMenu style={{ cursor: "pointer" }} />
      </div>
      <div>Notice</div>
      <div className="bg-red-500 px-3 py-2 flex gap-1 justify-between text-white">
        <p>Date</p>
        <p>Calender</p>
        <div className="flex">
          <div className="flex items-center cursor-pointer">
            <button>Province</button>
            <div className={`flex items-center justify-center pt-[6px]`}>
              <IoIosArrowDown style={{ cursor: "pointer", fontSize: "16px" }} />
            </div>
          </div>
          <button className={`${showCentralized ? "block" : "hidden"}`}>
            /Centralized
          </button>
        </div>
        <p>Notice</p>
      </div>
      <div className="flex items-center justify-center flex-col gap-2 ">
        <p>Title : </p>
        <div>Bar chart</div>
        
        <button className="bg-blue-600 text-white text-sm rounded-xl px-2 py-2 cursor-pointer">
          Publish
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
