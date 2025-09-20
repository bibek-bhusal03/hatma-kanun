import { useState } from "react";
import { Eye, Edit2 } from "lucide-react";

import EditProject from "./EditProject"; // new component for editing

export default function ProjectDashboard() {
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterStatus, setFilterStatus] = useState("All Statuses");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("list");
  const [editingProject, setEditingProject] = useState(null);

  const projects = [
    {
      id: "P001",
      name: "Ward 3 Drinking Water Tap",
      status: "Ongoing",
      budget: "NPR 2,500,000",
      dates: "2082-01-01 - 2082-03-30",
      category: "Water Supply",
    },
    {
      id: "P002",
      name: "Road Repair Phase I",
      status: "Completed",
      budget: "NPR 1,800,000",
      dates: "Completed on: 2082-02-28",
      category: "Road",
    },
    {
      id: "P003",
      name: "Primary School Renovation",
      status: "Planned",
      budget: "NPR 5,000,000",
      dates: "2083-04-01 - 2083-09-30",
      category: "Education",
    },
    {
      id: "P004",
      name: "Community Hall Construction",
      status: "Ongoing",
      budget: "NPR 3,500,000",
      dates: "2082-02-10 - 2082-06-15",
      category: "Community",
    },
    {
      id: "P005",
      name: "Drainage System Upgrade",
      status: "Completed",
      budget: "NPR 4,200,000",
      dates: "Completed on: 2082-01-30",
      category: "Sanitation",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Ongoing":
        return "bg-blue-100 text-blue-600";
      case "Completed":
        return "bg-green-100 text-green-600";
      case "Planned":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Filter and search logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      filterCategory === "All Categories" || project.category === filterCategory;
    const matchesStatus =
      filterStatus === "All Statuses" || project.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (editingProject) {
    return <EditProject project={editingProject} onClose={() => setEditingProject(null)} />;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-1">Project Dashboard</h2>
        <p className="text-sm text-gray-500 mb-6">
          View and manage all municipal projects in your ward.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded-lg flex-1 min-w-[200px]"
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option>All Categories</option>
            <option>Water Supply</option>
            <option>Road</option>
            <option>Education</option>
            <option>Community</option>
            <option>Sanitation</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option>All Statuses</option>
            <option>Ongoing</option>
            <option>Completed</option>
            <option>Planned</option>
          </select>

          <div className="ml-auto flex gap-2">
            <button
              className={`px-4 py-2 rounded-full ${
                view === "list"
                  ? "bg-sky-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setView("list")}
            >
              List View
            </button>
            <button
              className={`px-4 py-2 rounded-full ${
                view === "map"
                  ? "bg-sky-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setView("map")}
            >
              Map View
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left text-sm font-medium text-gray-600">
                <th className="p-3">Project ID</th>
                <th className="p-3">Project Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Budget</th>
                <th className="p-3">Dates</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id} className="border-t">
                  <td className="p-3 text-sm">{project.id}</td>
                  <td className="p-3 text-sm">{project.name}</td>
                  <td className="p-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm">{project.budget}</td>
                  <td className="p-3 text-sm">{project.dates}</td>
                  <td className="p-3 text-sm flex gap-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <Eye size={18} />
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setEditingProject(project)}
                    >
                      <Edit2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
