import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const Signin = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const API_URL = "http://localhost:4000";

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        // Save into zustand
        login(result.data);

        // Redirect
        navigate("/settings");
      } else {
        setError(result.message || "Invalid credentials. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center h-screen bg-gray-50">
      <div className="p-10 border rounded-2xl shadow-lg bg-white w-[350px] flex flex-col items-center">
        {/* Logo */}
        <NavLink to="/">
          <img
            src="/logo/logo-full.png" // Replace with your actual logo path
            alt="Logo"
            className="h-12 w-auto mb-6"
          />
        </NavLink>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-blue-600 text-center">
          Welcome back
        </h1>
        <p className="text-sm text-center text-gray-400/90 mb-4">
          Log in into your account
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border border-blue-300 px-3 py-2 rounded-md text-sm"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="border border-blue-300 px-3 py-2 rounded-md text-sm"
            required
          />

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <a
              href="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white mt-2 py-2 rounded-md hover:bg-blue-600 text-sm disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Sign Up */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-500 hover:underline font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
