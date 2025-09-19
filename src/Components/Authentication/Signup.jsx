import React from "react";

const Signup = () => {
  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="p-10 border-1 border-black rounded-4xl">
        <h1 className="text-2xl font-bold text-blue-600 text-center">
          Create an account
        </h1>
        <p className="text-md text-center text-gray-400/90">
          Set Up your account
        </p>
        <form action="" className="flex flex-col gap-1 ">
          <div className="flex text-lg flex-col gap-1">
            <label htmlFor="name" className="text-sm font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name "
              className="outline:none focus:outline-blue-500 border-1 border-blue-300 px-3.5 py-1.5 rounded-md text-sm w-[250px]"
            />
          </div>
          <div className="flex text-lg flex-col">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="outline:none focus:outline-blue-500  border-1 border-blue-300 px-3 py-1 rounded-md text-sm"
            />
          </div>
          <div className="flex text-lg flex-col">
            <label htmlFor="phone" className="text-sm font-semibold">
              Email
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className="outline:none focus:outline-blue-500  border-1 border-blue-300 px-3 py-1 rounded-md text-sm"
            />
          </div>
          <div className="flex text-lg flex-col">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="outline:none focus:outline-blue-500  border-1 border-blue-300 px-3 py-1 rounded-md text-sm"
            />
          </div>
          <div className="flex text-lg flex-col">
            <label htmlFor="confirm-password" className="text-sm font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="outline:none focus:outline-blue-500  border-1 border-blue-300 px-3 py-1 rounded-md text-sm"
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <input
              type="submit"
              value="Submit"
              className="bg-blue-400 text-white mt-4 px-7 py-1 rounded-md cursor-pointer hover:bg-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
