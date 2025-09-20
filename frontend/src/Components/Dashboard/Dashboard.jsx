import React from "react";
import Header from "./Header";
import Services from "./Services";
import BudgetTracking from "./BudgetTracking";
import RTIStatus from "./RTIStatus";
const Dashboard = () => {
  return (
    <div className="max-w-[800px] mx-auto bg-slate-100/80 p-1 max-h-screen overflow-auto pb-15">
      <Header />
      <Services />
      <BudgetTracking />
      <RTIStatus />
    </div>
  );
};

export default Dashboard;
