import { useState } from "react";

export default function AddNewProject() {
  const [formData, setFormData] = useState({
    projectName: "",
    category: "Water Supply",
    ward: "",
    location: "",
    startDate: "",
    endDate: "",
    responsibleParty: "",
    contactNo: "",
    budget: "",
    fundSource: "Municipal Fund",
    beneficiaries: "",
    photos: null,
    referenceDocs: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Project Saved!");
  };

  return (
    <div className="max-h-screen flex items-center justify-center p-2">
      <div className="max-h-screen flex bg-gray-100 p-6 overflow-auto mb-3">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-2">
            Add New Project
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Fill out the form to create a new project record.
          </p>

          {/* Project Name */}
          <label className="block mb-2 font-medium">Project Name</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Ward 3 Drinking Water Tap"
            className="w-full mb-4 p-2 border rounded-lg"
          />

          {/* Category & Ward */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full mb-4 p-2 border rounded-lg"
              >
                <option>Water Supply</option>
                <option>Road</option>
                <option>Electricity</option>
                <option>Sanitation</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">Ward / Location</label>
              <input
                type="text"
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                placeholder="Ward 3, Shreenagar"
                className="w-full mb-4 p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Pin Location */}
          <label className="block mb-2 font-medium">Pin Location on Map</label>
          <textarea
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded-lg"
            rows="3"
          ></textarea>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full mb-4 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full mb-4 p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Responsible Party */}
          <label className="block mb-2 font-medium">Responsible Party</label>
          <input
            type="text"
            name="responsibleParty"
            value={formData.responsibleParty}
            onChange={handleChange}
            placeholder="XYZ Builders Pvt Ltd or Municipal Officer"
            className="w-full mb-4 p-2 border rounded-lg"
          />

          {/* Contact Number */}
          <label className="block mb-2 font-medium">
            Responsible Party Contact No.
          </label>
          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            placeholder="98XXXXXXXX"
            className="w-full mb-4 p-2 border rounded-lg"
          />

          {/* Budget & Fund Source */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Allocated Budget</label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="NPR 2,500,000"
                className="w-full mb-4 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Fund Source</label>
              <select
                name="fundSource"
                value={formData.fundSource}
                onChange={handleChange}
                className="w-full mb-4 p-2 border rounded-lg"
              >
                <option>Municipal Fund</option>
                <option>State Fund</option>
                <option>Federal Fund</option>
              </select>
            </div>
          </div>

          {/* Beneficiaries */}
          <label className="block mb-2 font-medium">
            Beneficiaries (Households)
          </label>
          <input
            type="number"
            name="beneficiaries"
            value={formData.beneficiaries}
            onChange={handleChange}
            placeholder="40"
            className="w-full mb-4 p-2 border rounded-lg"
          />

          {/* File Uploads */}
          <label className="block mb-2 font-medium">
            Photos (before & during)
          </label>
          <input
            type="file"
            name="photos"
            onChange={handleChange}
            multiple
            className="w-full mb-4 p-2 border rounded-lg border-dashed"
          />

          <label className="block mb-2 font-medium">Reference Docs (PDF)</label>
          <input
            type="file"
            name="referenceDocs"
            onChange={handleChange}
            accept=".pdf"
            className="w-full mb-6 p-2 border rounded-lg border-dashed"
          />

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
