import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      setMessage("You must agree to the terms.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      console.log("debug phone", formData.phone);
      const response = await fetch(`http://localhost:4000/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone_no: Number(formData.phone),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Signup successful!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          agree: false,
        });
      } else {
        setMessage(result.message || "Signup failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="p-10 border-1 border-black rounded-4xl">
        <h1 className="text-2xl font-bold text-blue-600 text-center">
          Create an account
        </h1>
        <p className="text-md text-center text-gray-400/90">
          Set Up your account
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex text-lg flex-col gap-1">
            <label htmlFor="name" className="text-sm font-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="outline:none focus:outline-blue-500 border-1 border-blue-300 px-3.5 py-1.5 rounded-md text-sm w-[250px]"
              required
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
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="outline:none focus:outline-blue-500 border-1 border-blue-300 px-3 py-1 rounded-md text-sm"
              required
            />
          </div>

          <div className="flex text-lg flex-col">
            <label htmlFor="phone" className="text-sm font-semibold">
              Phone Number
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="outline:none focus:outline-blue-500 border-1 border-blue-300 px-3 py-1 rounded-md text-sm"
              required
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
              value={formData.password}
              onChange={handleChange}
              className="outline:none focus:outline-blue-500 border-1 border-blue-300 px-3 py-1 rounded-md text-sm"
              required
            />
          </div>

          <div className="flex text-lg flex-col">
            <label htmlFor="confirmPassword" className="text-sm font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="outline:none focus:outline-blue-500 border-1 border-blue-300 px-3 py-1 rounded-md text-sm"
              required
            />
          </div>

          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            <label htmlFor="agree" className="text-sm">
              I Agree All Statements In Terms Of Service.
            </label>
          </div>

          <div className="flex items-center justify-center w-full">
            <input
              type="submit"
              value="Sign up"
              className="bg-blue-400 text-white mt-4 w-[150px] py-2 rounded-md cursor-pointer hover:bg-blue-500"
            />
          </div>

          {message && <p className="text-red-500 mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
