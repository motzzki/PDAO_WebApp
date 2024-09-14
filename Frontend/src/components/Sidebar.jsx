import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

const Sidebar = ({ onShowModal }) => {
  return (
    <CDBSidebar className="d-flex flex-column vh-100">
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        PDAO
      </CDBSidebarHeader>
      <CDBSidebarContent className="d-flex flex-column">
        <CDBSidebarMenu className="flex-fill">
          <CDBSidebarMenuItem>Dashboard</CDBSidebarMenuItem>
          <CDBSidebarMenuItem>Notifications</CDBSidebarMenuItem>
          <CDBSidebarMenuItem onClick={onShowModal}>
            PWD Registration
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem>Graphical Report</CDBSidebarMenuItem>
        </CDBSidebarMenu>
        <div className="mt-auto">
          <CDBSidebarMenuItem>Logout</CDBSidebarMenuItem>
        </div>
      </CDBSidebarContent>
    </CDBSidebar>
  );
};

export default Sidebar;
