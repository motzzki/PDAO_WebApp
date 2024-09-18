import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="d-flex flex-column flex-md-row vh-100">
      <div className="h-100">
        <Sidebar />
      </div>
      <div className="flex-grow-1 d-flex flex-column overflow-auto p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
