import React, { useState, useEffect } from "react";
import { X } from "lucide-react"; // ✅ Lucide React icon

const AwarenessPosts = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  // 🔹 Lock background scroll when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedPost]);

  // 🔹 Dummy data (replace later with API fetch)
  const posts = [
    {
      id: 1,
      category: "Traffic Law",
      categoryColor: "bg-yellow-100 text-yellow-700",
      date: "Saturday, Sep 20, 2025",
      title: "Road Rules: Helmet Mandatory",
      summary:
        "Helmet is mandatory while riding a motorcycle. A fine of Rs. 1500 if violated.",
      description:
        "The Department of Transport Management has made the use of helmets and seat belts mandatory for all drivers. Helmets must be worn while riding a motorcycle and seat belts while driving a four-wheeler. Failure to do so can result in a fine of up to Rs. 1500 as per the law. Helmets and seat belts reduce the risk of accidents and help save lives.",
    },
    {
      id: 2,
      category: "Budget & Tax",
      categoryColor: "bg-blue-100 text-blue-700",
      date: "Saturday, Sep 20, 2025",
      title: "Budget Expenditure Report",
      summary:
        "The municipality has made public the quarterly budget expenditure details for the fiscal year 2082-083.",
      description:
        "The Budget Expenditure Report provides transparency into the municipal spending and allocations for the fiscal year 2082-083. Citizens can review expenses, track resource distribution, and understand how funds are managed for infrastructure, health, and development projects.",
    },
    {
      id: 3,
      category: "Environment & Health",
      categoryColor: "bg-green-100 text-green-700",
      date: "Saturday, Sep 20, 2025",
      title: "Importance of Water",
      summary: "Let's use water wisely. Saving water sources saves lives.",
      description:
        "Water conservation is vital for sustaining life. Overuse and pollution are depleting water resources rapidly. By saving water and protecting natural water sources, we ensure clean and safe water for future generations while also protecting ecosystems.",
    },
  ];

  return (
    <div className="bg-white shadow rounded-xl p-5 w-full mt-5 max-h-[300px] overflow-auto mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-800 text-lg">Awareness Posts</h2>
        <button className="text-blue-500 text-sm font-medium hover:underline">
          View All
        </button>
      </div>

      {/* Post list */}
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-50 border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Category + Date */}
            <div className="flex items-center gap-3 mb-2 text-sm">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${post.categoryColor}`}
              >
                {post.category}
              </span>
              <span className="text-gray-500 flex items-center gap-1">
                📅 {post.date}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-gray-800">{post.title}</h3>

            {/* Summary */}
            <p className="text-gray-600 text-sm mt-1">{post.summary}</p>

            {/* Read more */}
            <button
              className="mt-3 text-blue-500 text-sm font-medium hover:underline"
              onClick={() => setSelectedPost(post)}
            >
              Read More
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4"
          onClick={() => setSelectedPost(null)} // Close on outside click
        >
          <div
            className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent close on modal click
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedPost(null)}
            >
              <X size={24} />
            </button>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {selectedPost.title}
            </h2>

            {/* Category + Date */}
            <p className="text-sm text-gray-500 mb-4">
              {selectedPost.category} • {selectedPost.date}
            </p>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">
              {selectedPost.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AwarenessPosts;
