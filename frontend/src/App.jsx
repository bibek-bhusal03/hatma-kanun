import Dashboard from "./Components/Dashboard/Dashboard";
import DashboardCard from "./Components/Dashboard/DashboardCard";
import Navbar from "./Components/Navbar/Navbar";
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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
      </Routes>
    </Router>
  );
}

export default App;
/* 

*/
