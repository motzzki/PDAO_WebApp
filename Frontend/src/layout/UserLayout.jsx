import React from "react";
import UserHeader from "../components/UserHeader";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <div>
        <UserHeader />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
