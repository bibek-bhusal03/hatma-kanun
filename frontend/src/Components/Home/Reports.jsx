import React from "react";

const dummyReports = [
  {
    id: 1,
    title: "System Health Check",
    date: "2025-09-15",
    status: "Completed",
    summary: "All systems operational. No anomalies detected.",
  },
  {
    id: 2,
    title: "User Activity Report",
    date: "2025-09-18",
    status: "Pending",
    summary: "Awaiting data aggregation from user logs.",
  },
  {
    id: 3,
    title: "Security Audit",
    date: "2025-09-10",
    status: "Completed",
    summary: "No breaches found. Minor permission adjustments recommended.",
  },
  {
    id: 4,
    title: "Security Audit 4",
    date: "2025-09-10",
    status: "Completed",
    summary: "No breaches found. Minor permission adjustments recommended.",
  },
  {
    id: 5,
    title: "Security Audit 5",
    date: "2025-09-10",
    status: "Completed",
    summary: "No breaches found. Minor permission adjustments recommended.",
  },
  {
    id: 6,
    title: "Security Audit 6",
    date: "2025-09-10",
    status: "Completed",
    summary: "No breaches found. Minor permission adjustments recommended.",
  },
];

const Reports = () => {
  return (
    <div className="p-6 bg-gray-50 max-h-screen overflow-auto pb-10">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Reports</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dummyReports.map((report) => (
          <div
            key={report.id}
            className="bg-white shadow-sm hover:shadow-md transition rounded-xl border border-gray-200 p-6 sm:p-5 flex flex-col gap-3"
          >
            {/* Title */}
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {report.title}
            </h2>

            {/* Meta Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 gap-1">
              <p>
                <span className="font-medium text-gray-600">Date:</span>{" "}
                {report.date}
              </p>
              <p>
                <span className="font-medium text-gray-600">Status:</span>{" "}
                <span
                  className={`font-semibold ${
                    report.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {report.status}
                </span>
              </p>
            </div>

            {/* Summary */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {report.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
