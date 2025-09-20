import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OTPValidation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // data passed from Signup
  const { email, phone } = location.state || {};

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [counter, setCounter] = useState(30);

  // Countdown effect
  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [counter]);

  // Handle OTP submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp.match(/^[0-9]{6}$/)) {
      setError("OTP must be a 6-digit number.");
      return;
    }

    try {
      const API_URL = "http://localhost:4000";

      const response = await fetch(`${API_URL}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message || "OTP verified successfully!");
        // Navigate to dashboard or login page after a short delay
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setError(result.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  const handleResend = () => {
    setCounter(30);
    setError("");
    setSuccess("New OTP sent!");
    // 🚀 Call backend API to resend OTP
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-8 w-[350px]">
        <h1 className="text-xl font-bold text-blue-600 text-center">
          OTP Verification
        </h1>
        <p className="text-gray-600 text-center mt-1">
          We have sent an OTP to{" "}
          <span className="font-semibold">
            {email ? email : phone ? phone : "your account"}
          </span>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="border px-3 py-2 rounded-md text-center text-lg tracking-widest outline-none focus:ring-2 focus:ring-blue-400"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm text-center">{success}</p>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md mt-2"
          >
            Verify OTP
          </button>
        </form>

        <div className="text-center mt-4">
          {counter > 0 ? (
            <p className="text-gray-500 text-sm">
              Resend OTP in <span className="font-semibold">{counter}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-blue-500 hover:underline text-sm"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPValidation;
