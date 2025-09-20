import React from "react";
import { CiFileOn } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";

const Services = () => {
  return (
    <div className="p-3 rounded-xl  mx-3 my-5 border-1">
      <h1 className="font-semibold">Our Services</h1>
      <div className="mt-2 flex items-center justify-center gap-10 color-white w-full p-2">
        <div className="flex flex-col gap-2 items-center cursor-pointer">
          <div className="flex items-center justify-center bg-blue-400 p-3 rounded-full text-white">
            <CiFileOn color={{ fontSize: "35px" }} />
          </div>
          <p className="text-[12px] font-semibold">E-Sifaris</p>
        </div>
        <div className="flex flex-col gap-2 items-center cursor-pointer">
          <div className="flex items-center justify-center bg-purple-400 p-3 rounded-full text-white">
            <IoInformationCircleOutline color={{ fontSize: "35px" }} />
          </div>
          <p className="text-[12px] font-semibold">RTI</p>
        </div>
        <div className="flex flex-col gap-2 items-center cursor-pointer">
          <div className="flex items-center justify-center bg-green-400 p-3 rounded-full text-white">
            <GiReceiveMoney color={{ fontSize: "35px" }} />
          </div>
          <p className="text-[12px] font-semibold">WMG</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
