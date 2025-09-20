import React from "react";

const Signin = () => {
  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="p-10 border-1 border-black rounded-4xl">
        <div className="flex items-center justify-center">
          <img src="logo/logo-full.png" alt="logo" className="mb-1" />
        </div>
        <h1 className="text-2xl font-bold text-blue-600 text-center">
          Welcome back
        </h1>
        <p className="text-sm text-center text-gray-400/90">
          Log in into your account
        </p>
        <form action="" className="flex flex-col gap-3 ">
          <div className="flex text-lg flex-col">
            <label htmlFor="email" className="text-sm font-semibold">
              Email or Username
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

          <div className="flex flex-col items-center justify-center w-full gap-5">
            <input
              type="submit"
              value="Sign in"
              className="bg-blue-400 text-white mt-4 px-7 py-2 w-full rounded-md cursor-pointer hover:bg-blue-500"
            />
            <a href="" className="text-sm text-blue-500 hover:text-blue-400">
              Forgot Password
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
