import Dashboard from "./Components/Dashboard/Dashboard";
import DashboardCard from "./Components/Dashboard/DashboardCard";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Authentication/Signup";
import Signin from "./Components/Authentication/Signin";
import AdminDashboard from "./Components/Admin/Dashboard";
import NoticeAnnouncement from "./Components/Home/NoticeAnnouncement";
import BudgetAllocation from "./Components/Home/BudgetAllocation";
import AddNewProject from "./Components/Project/AddNewProject";
import ProjectDashboard from "./Components/Project/ProjectDashboard";
import EditProject from "./Components/Project/EditProject";

function App() {
  return (
    <>
      <>
        {/* <Dashboard />
        <Navbar /> */}

        {/* <EditProject /> */}
        <ProjectDashboard />
        {/* <AddNewProject /> */}
        {/* <BudgetAllocation /> */}
        {/* <NoticeAnnouncement /> */}
        {/* <Signup /> */}
        {/* <Signin /> */}
        {/* <AdminDashboard /> */}
      </>
    </>
  );
}

export default App;
