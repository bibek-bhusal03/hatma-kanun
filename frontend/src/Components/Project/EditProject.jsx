import { useState } from "react";
import { X } from "lucide-react";

export default function EditProject({ project, onClose }) {
  const [status, setStatus] = useState(project.status);
  const [progress, setProgress] = useState(50);

  const handleUpdate = (e) => {
    e.preventDefault();
    alert("Project updated successfully!");
    onClose();
  };

  return (
    <div className="p-6 bg-gray-100 max-h-screen overflow-auto">
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-3xl mx-auto">
        <button
          onClick={onClose}
          className="text-sm text-sky-500 hover:underline mb-4 flex items-center gap-1"
        >
          ← Back to Dashboard
        </button>

        <h2 className="text-2xl font-bold mb-1">
          Edit Project: {project.name}
        </h2>
        <p className="text-sm text-gray-500 mb-6">Project ID: {project.id}</p>

        {/* Update Progress */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Update Progress</h3>
          <label className="block mb-2 text-sm">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border rounded-lg mb-4 w-full"
          >
            <option>Ongoing</option>
            <option>Completed</option>
            <option>Planned</option>
          </select>

          <label className="block mb-2 text-sm">
            Percentage Completion (%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            className="w-full"
          />
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-sky-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Project Media */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Project Media</h3>
          <div className="space-y-2">
            <div className="p-3 border rounded-lg flex justify-between items-center">
              <span>before_project_plan.jpg</span>
              <X size={16} className="text-gray-500 cursor-pointer" />
            </div>
            <div className="p-3 border rounded-lg flex justify-between items-center">
              <span>construction_progress.mp4</span>
              <X size={16} className="text-gray-500 cursor-pointer" />
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">
              Citizen Submissions (for approval)
            </h4>
            <div className="p-3 border rounded-lg flex justify-between items-center bg-yellow-50">
              <span>citizen_update_2082.jpg</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-lg bg-green-500 text-white text-sm">
                  Approve
                </button>
                <button className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm">
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Update History */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Update History</h3>
          <div className="border rounded-lg divide-y">
            <div className="p-3 text-sm">
              <div className="font-medium">2082-03-01 - John Doe</div>
              <p className="text-gray-600">
                Changed status from Planned to Ongoing, %progress% from 20% to
                50%.
              </p>
            </div>
            <div className="p-3 text-sm">
              <div className="font-medium">2082-02-20 - John Doe</div>
              <p className="text-gray-600">
                Initial project creation. Set status to Planned and %progress%
                to 20%.
              </p>
            </div>
          </div>
        </div>

        {/* Budget Usage */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Budget Usage</h3>
          <div className="grid grid-cols-3 gap-4 mb-4 text-center">
            <div className="p-4 rounded-lg bg-blue-50">
              <p className="text-xs text-gray-500">Project Amount</p>
              <p className="text-lg font-bold text-blue-600">5,000,000 NPR</p>
            </div>
            <div className="p-4 rounded-lg bg-red-50">
              <p className="text-xs text-gray-500">Amount Expensed</p>
              <p className="text-lg font-bold text-red-600">1,200,000 NPR</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50">
              <p className="text-xs text-gray-500">Amount Available</p>
              <p className="text-lg font-bold text-green-600">3,800,000 NPR</p>
            </div>
          </div>

          <table className="w-full text-sm border">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Spent By</th>
                <th className="p-2 text-left">Purpose</th>
                <th className="p-2 text-left">Amount (NPR)</th>
                <th className="p-2 text-left">Attachment</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-2">2082-02-15</td>
                <td className="p-2">Accountant</td>
                <td className="p-2">Road materials</td>
                <td className="p-2">500,000</td>
                <td className="p-2">-</td>
              </tr>
              <tr className="border-t">
                <td className="p-2">2082-02-25</td>
                <td className="p-2">Manager</td>
                <td className="p-2">Labor wages</td>
                <td className="p-2">700,000</td>
                <td className="p-2">-</td>
              </tr>
            </tbody>
          </table>

          {/* Add Expense */}
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Add New Expense</h4>
            <div className="grid grid-cols-5 gap-2 mb-2">
              <input type="date" className="p-2 border rounded-lg text-sm" />
              <input
                type="text"
                placeholder="Spent By"
                className="p-2 border rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="Purpose"
                className="p-2 border rounded-lg text-sm"
              />
              <input
                type="number"
                placeholder="Amount"
                className="p-2 border rounded-lg text-sm"
              />
              <input type="file" className="p-2 border rounded-lg text-sm" />
            </div>
            <button className="px-4 py-2 rounded-lg bg-sky-500 text-white text-sm">
              Add Expense
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleUpdate}
          className="px-4 py-2 rounded-lg bg-green-500 text-white w-full"
        >
          Update Project
        </button>
      </div>
    </div>
  );
}
