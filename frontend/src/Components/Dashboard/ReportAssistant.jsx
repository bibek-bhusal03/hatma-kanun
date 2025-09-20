import React, { useState } from "react";

const ReportAssistant = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert("Please enter your issue or question!");
      return;
    }
    console.log("Report submitted:", query);
    // 🔥 Replace this with API call or backend integration
    setQuery("");
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 w-full max-h-[250px] overflow-auto">
      <h2 className="font-semibold text-gray-800 mb-3">Report Assistant</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Input */}
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your issue or question here..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y min-h-[80px]"
        />
        {/* Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2.5 rounded-xl shadow flex items-center gap-2 whitespace-nowrap"
          >
            Summarize Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportAssistant;
