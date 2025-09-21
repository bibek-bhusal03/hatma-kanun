import React, { useState } from "react";

const RTIStatus = () => {
  const rtiData = [
    { id: 1, title: "Water Supply Project", status: "Under Review" },
    { id: 2, title: "Road Construction in Ward 5", status: "Approved" },
    { id: 3, title: "School Renovation Program", status: "Pending" },
    { id: 4, title: "Bridge Construction", status: "Rejected" },
    { id: 5, title: "Bridge Construction 6", status: "Rejected" },
    { id: 6, title: "Bridge Construction yr", status: "Rejected" },
    { id: 7, title: "Bridge Construction 8", status: "Rejected" },
    { id: 8, title: "Bridge Construction 123", status: "Rejected" },
  ];

  const [filter, setFilter] = useState("All");

  // Status badge styles
  const getStatusClasses = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-600";
      case "Under Review":
        return "bg-yellow-100 text-yellow-600";
      case "Pending":
        return "bg-gray-100 text-gray-600";
      case "Rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Filtered data
  const filteredData =
    filter === "All"
      ? rtiData
      : rtiData.filter((item) => item.status === filter);

  return (
    <div className="bg-white my-5 shadow rounded-xl p-4 w-full max-w-[700px] mx-auto max-h-[300px] overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-800">RTI Status</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 text-sm rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All</option>
          <option value="Approved">Approved</option>
          <option value="Under Review">Under Review</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-200 px-4 py-3 rounded-xl"
            >
              <span className="text-sm font-medium text-gray-700">
                {item.title}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center">No data found</p>
        )}
      </div>
    </div>
  );
};

export default RTIStatus;
