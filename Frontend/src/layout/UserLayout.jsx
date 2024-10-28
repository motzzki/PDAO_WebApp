import React from "react";
import UserHeader from "../components/UserHeader";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

const UserLayout = () => {
  return (
    <div>
      <header>
        <UserHeader />
      </header>

      <main className="bg-custom">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;