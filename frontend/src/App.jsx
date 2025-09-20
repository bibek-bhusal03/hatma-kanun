import Dashboard from "./Components/Dashboard/Dashboard";

import Signup from "./Components/Authentication/Signup";
import Signin from "./Components/Authentication/Signin";
import Otp from "./Components/Authentication/Otp";

import AdminDashboard from "./Components/Admin/Dashboard";
import NoticeAnnouncement from "./Components/Home/NoticeAnnouncement";
import BudgetAllocation from "./Components/Home/BudgetAllocation";
import AddNewProject from "./Components/Project/AddNewProject";
import ProjectDashboard from "./Components/Project/ProjectDashboard";
import EditProject from "./Components/Project/EditProject";
import CreateAwarenessPost from "./Components/Notice/CreateAwarenessPost";
import AwarenessNotice from "./Components/Notice/AwarenessNotice";
import Layout from "./Components/Navbar/Layout";
import ESifarisApplication from "./Components/ESifaris/ESifarisApplication";
import RtiRequestForm from "./Components/RtiRequestForm/RtiRequestForm";
import { Navigate, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      {/* Auth routes - no navbar */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/esifaris" element={<ESifarisApplication />} />
      <Route path="/RtiRequestForm" element={<RtiRequestForm />} />

      {/* Routes with Navbar */}
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reports" element={<AdminDashboard />} />
        <Route path="/calls" element={<ProjectDashboard />} />
        {/* <Route path="/settings" element={<Settings />} />
        <Route path="/map" element={<Map />} /> */}
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
