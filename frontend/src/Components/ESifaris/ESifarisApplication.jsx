import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const ESifarisApplication = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    applicantName: "",
    parentName: "",
    citizenshipNo: "",
    ward: "",
    locality: "",
    sifarisType: "",
    reason: "",
    files: null,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [applications, setApplications] = useState([]);

  // 🔹 Dummy applications fetch
  useEffect(() => {
    setTimeout(() => {
      setApplications([
        {
          id: 1,
          type: "Scholarship / Education Certificate Sifaris",
          applicant: "Aayush Chapagain",
          reason: "For higher studies application",
          status: "Pending",
          submittedAt: "2025-09-20, 12:13:25 PM",
        },
      ]);
    }, 500);
  }, []);

  // 🔹 Validation
  const validate = () => {
    const newErrors = {};
    if (!form.applicantName.trim())
      newErrors.applicantName = "Applicant Name is required";
    if (!form.parentName.trim())
      newErrors.parentName = "Father/Mother Name is required";
    if (!form.citizenshipNo || !/^[0-9]+$/.test(form.citizenshipNo))
      newErrors.citizenshipNo = "Valid Citizenship No. is required";
    if (!form.ward) newErrors.ward = "Please select a ward";
    if (!form.sifarisType)
      newErrors.sifarisType = "Please select a Sifaris type";
    if (!form.reason || form.reason.length < 5)
      newErrors.reason = "Reason must be at least 5 characters";
    if (!form.files) newErrors.files = "Upload at least one document";
    return newErrors;
  };

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);

      setApplications((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: form.sifarisType,
          applicant: form.applicantName,
          reason: form.reason,
          status: "Pending",
          submittedAt: new Date().toLocaleString(),
        },
      ]);

      // Reset form
      setForm({
        applicantName: "",
        parentName: "",
        citizenshipNo: "",
        ward: "",
        locality: "",
        sifarisType: "",
        reason: "",
        files: null,
      });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* 🔹 Header */}
      <div className="flex items-center bg-indigo-600 text-white px-4 py-3 shadow">
        <button onClick={() => navigate(-1)} className="mr-3">
          <IoArrowBack size={24} />
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center">E-Sifaris</h1>
      </div>

      {/* 🔹 Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-xl p-5 space-y-4"
        >
          <h2 className="text-lg font-bold text-gray-700 mb-2">
            New Application
          </h2>

          {/* Applicant Name */}
          <div>
            <label className="block font-medium">Applicant Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={form.applicantName}
              onChange={(e) =>
                setForm({ ...form, applicantName: e.target.value })
              }
              className="w-full p-2 border rounded mt-1 focus:ring focus:ring-indigo-300"
            />
            {errors.applicantName && (
              <p className="text-red-500 text-sm">{errors.applicantName}</p>
            )}
          </div>

          {/* Parent Name */}
          <div>
            <label className="block font-medium">Father / Mother Name</label>
            <input
              type="text"
              placeholder="e.g. Michael Doe"
              value={form.parentName}
              onChange={(e) => setForm({ ...form, parentName: e.target.value })}
              className="w-full p-2 border rounded mt-1 focus:ring focus:ring-indigo-300"
            />
            {errors.parentName && (
              <p className="text-red-500 text-sm">{errors.parentName}</p>
            )}
          </div>

          {/* Citizenship No */}
          <div>
            <label className="block font-medium">Citizenship No.</label>
            <input
              type="text"
              placeholder="e.g. 123456789"
              value={form.citizenshipNo}
              onChange={(e) =>
                setForm({ ...form, citizenshipNo: e.target.value })
              }
              className="w-full p-2 border rounded mt-1 focus:ring focus:ring-indigo-300"
            />
            {errors.citizenshipNo && (
              <p className="text-red-500 text-sm">{errors.citizenshipNo}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <label className="block font-medium">Ward</label>
              <select
                value={form.ward}
                onChange={(e) => setForm({ ...form, ward: e.target.value })}
                className="w-full p-2 border rounded mt-1 focus:ring focus:ring-indigo-300"
              >
                <option value="">Select Ward</option>
                {[1, 2, 3, 4, 5].map((ward) => (
                  <option key={ward} value={ward}>
                    Ward {ward}
                  </option>
                ))}
              </select>
              {errors.ward && (
                <p className="text-red-500 text-sm">{errors.ward}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block font-medium">Street / Locality</label>
              <input
                type="text"
                placeholder="e.g. New Baneshwor"
                value={form.locality}
                onChange={(e) => setForm({ ...form, locality: e.target.value })}
                className="w-full p-2 border rounded mt-1 focus:ring focus:ring-indigo-300"
              />
            </div>
          </div>

          {/* Sifaris Type */}
          <div>
            <label className="block font-medium">Sifaris Type</label>
            <select
              value={form.sifarisType}
              onChange={(e) =>
                setForm({ ...form, sifarisType: e.target.value })
              }
              className="w-full p-2 border rounded mt-1 focus:ring focus:ring-indigo-300"
            >
              <option value="">Select a Sifaris Type</option>
              <option value="Scholarship / Education Certificate Sifaris">
                Scholarship / Education Certificate Sifaris
              </option>
              <option value="Land Registration Sifaris">
                Land Registration Sifaris
              </option>
            </select>
            {errors.sifarisType && (
              <p className="text-red-500 text-sm">{errors.sifarisType}</p>
            )}
          </div>

          {/* Reason */}
          <div>
            <label className="block font-medium">Purpose / Reason</label>
            <textarea
              placeholder="Provide a brief reason for your application..."
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className="w-full p-2 border rounded mt-1 focus:ring focus:ring-indigo-300"
              rows={3}
            ></textarea>
            {errors.reason && (
              <p className="text-red-500 text-sm">{errors.reason}</p>
            )}
          </div>

          {/* File Upload */}
          <div>
            <label className="block font-medium">Upload Documents</label>
            <input
              type="file"
              multiple
              onChange={(e) => setForm({ ...form, files: e.target.files })}
              className="mt-1"
            />
            {errors.files && (
              <p className="text-red-500 text-sm">{errors.files}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Submit Application
          </button>

          {submitted && (
            <p className="text-green-600 font-medium mt-2">
              ✅ Application submitted successfully!
            </p>
          )}
        </form>

        {/* Applications List */}
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="font-bold mb-3">Your Applications</h3>
          {applications.length === 0 ? (
            <p className="text-gray-500 text-sm">No applications yet.</p>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 border rounded-lg flex flex-col gap-1 bg-gray-50"
                >
                  <p className="font-semibold">{app.type}</p>
                  <p>
                    <span className="font-medium">Applicant:</span>{" "}
                    {app.applicant}
                  </p>
                  <p>
                    <span className="font-medium">Reason:</span> {app.reason}
                  </p>
                  <p className="text-sm text-gray-500">
                    Submitted on: {app.submittedAt}
                  </p>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full self-start ${
                      app.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ESifarisApplication;
