import React, { useState } from "react";

const ReportAssistant = () => {
  const [query, setQuery] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Please enter your issue or question!");
      return;
    }

    // Reset states before a new API call
    setIsLoading(true);
    setError(null);
    setSummary("");

    try {
      const response = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSummary(data.generatedText);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to get summary. Please try again.");
    } finally {
      setIsLoading(false);
      setQuery(""); // Clear the input field
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 w-full max-h-[500px] overflow-auto">
      <h2 className="font-semibold text-gray-800 mb-3">Report Assistant</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your issue or question here..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y min-h-[80px]"
        />
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2.5 rounded-xl shadow flex items-center gap-2 whitespace-nowrap ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Summarizing..." : "Summarize Report"}
          </button>
        </div>
      </form>

      {/* Display Area for Summary, Loading, and Errors */}
      <div className="mt-4 p-4 bg-gray-100 rounded-lg max-h-[200px] overflow-y-auto">
        {isLoading && (
          <p className="text-gray-500">Processing your request...</p>
        )}
        {error && <p className="text-red-500 font-medium">{error}</p>}
        {summary && (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">Summary:</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportAssistant;
