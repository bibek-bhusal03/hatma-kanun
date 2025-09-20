import React, { useState } from "react";

const CreateAwareness = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [media, setMedia] = useState(null);

  const [publishType, setPublishType] = useState("instant"); // "instant" | "scheduled"
  const [scheduledDate, setScheduledDate] = useState("");

  const [referenceType, setReferenceType] = useState("url"); // "url" | "file"
  const [referenceUrl, setReferenceUrl] = useState("");
  const [referenceFile, setReferenceFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      category,
      shortDesc,
      fullContent,
      media,
      publishType,
      scheduledDate: publishType === "scheduled" ? scheduledDate : null,
      referenceType,
      referenceUrl: referenceType === "url" ? referenceUrl : null,
      referenceFile: referenceType === "file" ? referenceFile : null,
    };

    console.log("Form Submitted:", formData);
    alert("Awareness post submitted! Check console for details.");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 max-h-screen overflow-auto">
      <button className="text-blue-600 mb-4">&larr; Back to Dashboard</button>

      <h1 className="text-2xl font-bold mb-2">Create Awareness Post</h1>
      <p className="text-gray-500 mb-6">
        Use this form to publish public announcements and awareness campaigns.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow"
      >
        {/* Post Details */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Post Details</h2>

          <label className="block mb-2 font-medium">Post Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., सडक नियम: हेल्मेट अनिवार्य"
            className="w-full border rounded-lg p-2 mb-4"
            required
          />

          <label className="block mb-2 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
            required
          >
            <option value="">Select a category</option>
            <option value="road-safety">Road Safety</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="environment">Environment</option>
          </select>

          <label className="block mb-2 font-medium">Short Description</label>
          <textarea
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            placeholder="e.g., मोटरसाइकल चलाउँदा हेल्मेट अनिवार्य छ। उल्लंघन गर्दा रु. १५०० जरिवाना।"
            className="w-full border rounded-lg p-2 mb-4"
            rows={2}
            required
          />

          <label className="block mb-2 font-medium">
            Full Content / Details
          </label>
          <textarea
            value={fullContent}
            onChange={(e) => setFullContent(e.target.value)}
            placeholder="Provide detailed information, FAQs, and consequences."
            className="w-full border rounded-lg p-2 mb-4"
            rows={4}
            required
          />

          <label className="block mb-2 font-medium">Media Upload</label>
          <input
            type="file"
            multiple
            onChange={(e) => setMedia(e.target.files)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Publishing Options */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Publishing Options</h2>

          <div className="mb-4">
            <span className="font-medium">Publishing Time</span>
            <div className="flex gap-6 mt-2">
              <label>
                <input
                  type="radio"
                  value="instant"
                  checked={publishType === "instant"}
                  onChange={() => setPublishType("instant")}
                />{" "}
                Instant Publish
              </label>
              <label>
                <input
                  type="radio"
                  value="scheduled"
                  checked={publishType === "scheduled"}
                  onChange={() => setPublishType("scheduled")}
                />{" "}
                Scheduled Publish
              </label>
            </div>
          </div>

          {publishType === "scheduled" && (
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Select Date & Time for Publication
              </label>
              <input
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <span className="font-medium">Reference Source (optional)</span>
            <div className="flex gap-6 mt-2">
              <label>
                <input
                  type="radio"
                  value="url"
                  checked={referenceType === "url"}
                  onChange={() => setReferenceType("url")}
                />{" "}
                Official Law (URL)
              </label>
              <label>
                <input
                  type="radio"
                  value="file"
                  checked={referenceType === "file"}
                  onChange={() => setReferenceType("file")}
                />{" "}
                Upload File
              </label>
            </div>
          </div>

          {referenceType === "url" && (
            <input
              type="url"
              value={referenceUrl}
              onChange={(e) => setReferenceUrl(e.target.value)}
              placeholder="Link to official law / PDF"
              className="w-full border rounded-lg p-2 mb-4"
            />
          )}

          {referenceType === "file" && (
            <input
              type="file"
              onChange={(e) => setReferenceFile(e.target.files[0])}
              className="w-full border rounded-lg p-2 mb-4"
            />
          )}
        </div>

        {/* Buttons */}
        {publishType === "instant" ? (
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg"
          >
            Publish Now
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
          >
            Schedule Post
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateAwareness;
