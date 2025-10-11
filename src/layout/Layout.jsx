import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Hedaer/>

      {/* Body (Sidebar + Content) */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar/>
        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
