import React, { useState } from "react";

const AwarenessNotices = () => {
  const [mode, setMode] = useState("list"); // list | view | edit
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedNotice, setSelectedNotice] = useState(null);

  const notices = [
    {
      id: 1,
      title: "सडक नियम: हेल्मेट अनिवार्य",
      category: "Traffic Law",
      scheduledDate: "2082-06-15 10:00",
      postedDate: null,
      status: "Scheduled",
      summary:
        "यस सूचनाले सडकमा सवारी चलाउँदा हेल्मेट अनिवार्य गर्ने जानकारी दिन्छ।",
      details: {
        intro:
          "सडकमा सवारी चलाउँदा हेल्मेट प्रयोग अनिवार्य गरिएको छ, जसले सुरक्षा बढाउँछ।",
        achievements: [
          "सवारी दुर्घटनामा मृत्यु दर घटाउने।",
          "सुरक्षा सचेतना बढाउने।",
        ],
        plans: "अझै कठोर निगरानी र नियम पालना नगरिएमा कारबाही गर्ने।",
        reference: null,
      },
    },
    {
      id: 2,
      title: "बजेट खर्च रिपोर्ट",
      category: "Budget & Tax",
      scheduledDate: null,
      postedDate: "2082-05-28 14:30",
      status: "Posted",
      summary: "स्थानीय सरकारद्वारा प्रस्तुत गरिएको बजेट खर्च रिपोर्ट।",
      details: {
        intro:
          "स्थानीय सरकार संझानै नगर, २०७९ अनुसार यस गाउँपालिका/नगरपालिकाको आर्थिक वर्ष 2082-83 को योजनाहरूको बजेट खर्चको विवरण सार्वजनिक गरिएको छ। नागरिकलाई वित्तीय पारदर्शिता प्रदान गर्न यो रिपोर्ट तयार गरिएको हो।",
        achievements: [
          "सडक निर्माण: कुल बजेटको ४०% सडक मर्मत र नयाँ निर्माणमा खर्च।",
          "शिक्षा: विद्यालय पूर्वाधार र छात्रवृत्तिका लागि २५% बजेट छुट्याइयो।",
          "स्वास्थ्य सेवा: स्वास्थ्य केन्द्र विस्तार र औषधि आपूर्तिमा १५% खर्च।",
        ],
        plans:
          "अगामी वर्ष कृषिमा ३०% बजेट वृद्धि, स्वास्थ्य सेवामा थप विस्तार र रोजगारी सिर्जना गर्ने नयाँ कार्यक्रमहरू अघि बढाइनेछ।",
        reference: {
          label: "Official_Budget_Report_2082.pdf",
          url: "/files/Official_Budget_Report_2082.pdf",
        },
      },
    },
  ];

  const categories = [
    "All",
    "Traffic Law",
    "Budget & Tax",
    "Local Governance",
    "Women & Child Rights",
    "Environment & Health",
  ];

  // Filtering
  const filteredNotices = notices.filter((n) => {
    if (activeTab === "scheduled" && n.status !== "Scheduled") return false;
    if (activeTab === "posted" && n.status !== "Posted") return false;
    if (
      searchTerm &&
      !n.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !n.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    if (filterCategory !== "All" && n.category !== filterCategory) return false;
    return true;
  });

  // ========== DETAIL VIEW ==========
  if (mode === "view" && selectedNotice) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6 h-screen overflow-auto">
        <button
          onClick={() => {
            setMode("list");
            setSelectedNotice(null);
          }}
          className="text-blue-500 hover:underline mb-4"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-xl md:text-2xl font-bold">
              {selectedNotice.title}
            </h1>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
              Download as PDF
            </button>
          </div>

          <div className="text-gray-600 mb-2 text-sm md:text-base">
            <span className="font-semibold">{selectedNotice.category}</span> ·{" "}
            {selectedNotice.postedDate ? (
              <span>
                Posted: {selectedNotice.postedDate}{" "}
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                  Posted
                </span>
              </span>
            ) : (
              <span>
                Scheduled: {selectedNotice.scheduledDate}{" "}
                <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs">
                  Scheduled
                </span>
              </span>
            )}
          </div>

          <p className="mb-6 text-gray-800">{selectedNotice.details.intro}</p>

          {selectedNotice.details.achievements && (
            <>
              <h2 className="text-lg font-semibold mb-2">मुख्य उपलब्धिहरू</h2>
              <ul className="list-disc pl-6 mb-6 text-gray-800">
                {selectedNotice.details.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </>
          )}

          {selectedNotice.details.plans && (
            <>
              <h2 className="text-lg font-semibold mb-2">आगामी योजना</h2>
              <p className="text-gray-800 mb-6">
                {selectedNotice.details.plans}
              </p>
            </>
          )}

          {selectedNotice.details.reference && (
            <div className="mt-6">
              <h2 className="font-semibold mb-2">Reference Source</h2>
              <a
                href={selectedNotice.details.reference.url}
                download
                className="text-blue-600 underline"
              >
                {selectedNotice.details.reference.label}
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ========== EDIT FORM ==========
  if (mode === "edit" && selectedNotice) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl overflow-auto max-h-screen">
        <button
          onClick={() => {
            setMode("list");
            setSelectedNotice(null);
          }}
          className="text-blue-500 hover:underline mb-4"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-2xl font-bold mb-2">Edit Awareness Post</h1>
        <p className="text-gray-600 mb-6">
          Make changes to the post and save them.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Post Title</label>
            <input
              type="text"
              defaultValue={selectedNotice.title}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              defaultValue={selectedNotice.category}
              className="w-full border rounded-lg p-2"
            >
              {categories
                .filter((c) => c !== "All")
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Short Description</label>
            <textarea
              defaultValue={selectedNotice.summary}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Full Content / Details
            </label>
            <textarea
              defaultValue={selectedNotice.details.intro}
              rows={5}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Media Upload (Photo/Infographic)
            </label>
            <input type="file" className="w-full border rounded-lg p-2" />
          </div>

          <div>
            <label className="block font-medium mb-1">Reference Source</label>
            <input
              type="url"
              placeholder="https://example.com"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="flex items-center gap-4">
            <label>
              <input type="radio" name="publish" /> Instant Publish
            </label>
            <label>
              <input type="radio" name="publish" defaultChecked /> Scheduled
              Post
            </label>
            <input
              type="datetime-local"
              defaultValue={
                selectedNotice.scheduledDate ? "2082-06-15T10:00" : undefined
              }
              className="border rounded-lg p-2"
            />
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
            Save & Schedule
          </button>
        </form>
      </div>
    );
  }

  // ========== LIST VIEW ==========
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 h-screen overflow-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Awareness Notices</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow">
          + Create Awareness Post
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {["all", "scheduled", "posted"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {tab === "all"
              ? "All Notices"
              : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title, category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border rounded-lg p-2"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border rounded-lg p-2"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Post Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Scheduled Date/Time</th>
              <th className="p-3">Posted Date/Time</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotices.map((n) => (
              <tr key={n.id} className="border-t">
                <td className="p-3">{n.title}</td>
                <td className="p-3">{n.category}</td>
                <td className="p-3">{n.scheduledDate || "-"}</td>
                <td className="p-3">{n.postedDate || "-"}</td>
                <td className="p-3">
                  {n.status === "Posted" ? (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs md:text-sm">
                      Posted
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs md:text-sm">
                      Scheduled
                    </span>
                  )}
                </td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedNotice(n);
                      setMode("view");
                    }}
                    className="text-gray-500 hover:text-blue-500"
                  >
                    👁️
                  </button>
                  <button
                    onClick={() => {
                      setSelectedNotice(n);
                      setMode("edit");
                    }}
                    className="text-gray-500 hover:text-green-500"
                  >
                    ✏️
                  </button>
                  <button className="text-gray-500 hover:text-red-500">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
            {filteredNotices.length === 0 && (
              <tr>
                <td className="p-3 text-center text-gray-500" colSpan={6}>
                  No notices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AwarenessNotices;
