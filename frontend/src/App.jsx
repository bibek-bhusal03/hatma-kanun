import React from "react";
import Dashboard from "./Components/Dashboard/Dashboard";

import Signup from "./Components/Authentication/Signup";
import Signin from "./Components/Authentication/Signin";
import Otp from "./Components/Authentication/Otp";

import AddNewProject from "./Components/Project/AddNewProject";
import ProjectDashboard from "./Components/Project/ProjectDashboard";
import EditProject from "./Components/Project/EditProject";
import CreateAwarenessPost from "./Components/Notice/CreateAwarenessPost";
import AwarenessNotice from "./Components/Notice/AwarenessNotice";
import Layout from "./Components/Navbar/Layout";
import Reports from "./Components/Home/Reports";
import Map from "./Components/Home/Map";
import Settings from "./Components/Home/Settings";
import ESifarisApplication from "./Components/ESifaris/ESifarisApplication";
import RtiRequestForm from "./Components/RtiRequestForm/RtiRequestForm";
import Call from "./Components/Home/Call";
import { useLocalGovernment } from "./hooks/useLocalGovernment";
import { Navigate, Routes, Route } from "react-router-dom";

function App() {
  useLocalGovernment();

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
        <Route path="/reports" element={<Reports />} />
        <Route path="/calls" element={<Call />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/map" element={<Map />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
