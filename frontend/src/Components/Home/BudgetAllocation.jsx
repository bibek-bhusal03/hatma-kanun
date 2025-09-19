import React from "react";
import { CiFileOn } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";

const BudgetAllocation = () => {
  return (
    <>
      <div className="p-10">
        <div className="flex items-center justify-center">
          {/* <img src="logo/logo-full.png" alt="logo" className=" h-[60px]" /> */}
          <div className="text-center text-5xl font-bold text-blue-500">
            Sonika
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-800">
          <p>Home</p>
          <MdKeyboardArrowRight />
          <p>Notice Announcement</p>
        </div>
        <div className="border-1 border-black mt-2 rounded-md">
          <div className="font-bold bg-green-500 border-1 border-green-500 text-white flex items-center justify-between px-8 py-4 rounded-md ">
            <div className="text-2xl flex gap-1 items-center">
              <CiFileOn />
              <p>Update & Announcement</p>
            </div>
            <div className="flex items-center text-black gap-2 text-sm ">
              <p className="text-black bg-white p-2 rounded-md text-[12px] font-light">
                <input type="date" />
              </p>
              <p className="text-black bg-white p-2 rounded-md text-[12px] font-semi-bold">
                View Notice
              </p>
            </div>
          </div>

          <form className="flex">
            <div className="p-8 pl-15 flex-1">
              <div className="flex gap-4">
                <label htmlFor="notice_id" className="text-gray-700">
                  Notice_id
                </label>
                <input
                  type="text"
                  id="notice_id"
                  name="notice_id"
                  className="ml-8 border-1 border-gray-500 outline:none focus:outline-blue-500 rounded-lg py-1 px-2 text-sm"
                />
              </div>
              <div className="flex gap-4 mt-5">
                <label htmlFor="Notice_title" className="text-gray-700">
                  Notice_title
                </label>
                <input
                  type="text"
                  id="Notice_title"
                  name="Notice_title"
                  className="ml-5 border-1 border-gray-500 outline:none focus:outline-blue-500 rounded-lg py-1 px-2 text-sm"
                />
              </div>

              <div className="flex gap-4 mt-5">
                <label htmlFor="category" className="text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  className="ml-9 border-1 border-gray-500 outline:none focus:outline-blue-500 rounded-lg py-1 px-2 text-sm text-gray-500"
                >
                  <option value="Training/Legal Awareness">
                    Training/Legal Awareness
                  </option>
                </select>
              </div>
              <div className="flex gap-4 mt-5">
                <label htmlFor="description" className="text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  className="ml-5 border-1 border-gray-500 outline:none focus:outline-blue-500 rounded-lg py-1 px-2 text-sm text-gray-500"
                  rows={4}
                  cols={25}
                ></textarea>
              </div>
            </div>
            <div className="p-8 flex-1">
              <div className="flex gap-4">
                <label htmlFor="attachment" className="text-gray-700">
                  Attachment
                </label>
                <input
                  type="file"
                  id="attachment"
                  name="attachment"
                  className="ml-8 border-1 border-gray-500 outline:none focus:outline-blue-500 rounded-lg py-1 px-2 text-sm"
                />
              </div>
              <div className="flex gap-4 mt-5">
                <label htmlFor="audience" className="text-gray-700">
                  Audience
                </label>
                <select
                  name="audience"
                  id="audience"
                  className="ml-12 border-1 border-gray-500 outline:none focus:outline-blue-500 rounded-lg py-1 px-5 text-sm text-gray-500"
                >
                  <option value="Training/Legal Awareness">All Citizens</option>
                </select>
              </div>
              <div className="mt-10 flex items-center gap-5">
                <input
                  type="submit"
                  value="Submit"
                  className="text-white font-semibold px-10 cursor-pointer py-1 bg-green-500 rounded-lg"
                />
                <div className="flex items-center gap-1">
                  <input type="checkbox" name="announcement-checkbox" />
                  <label htmlFor="announcement-checkbox">
                    Publish Announcement
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BudgetAllocation;
