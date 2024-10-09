import React from "react";
import { Outlet } from "react-router-dom";
import StaffSidebar from "../components/StaffSidebar";

const StaffLayout = () => {
  return (
    <div className="d-flex flex-column flex-md-row vh-100">
      <div className="h-100">
        <StaffSidebar />
      </div>
      <div className="flex-grow-1 d-flex flex-column overflow-auto p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default StaffLayout;
