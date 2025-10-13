import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header/>

      {/* Body (Sidebar + Content) */}
      <div className=" bg-[#F9F9F9] py-[16px]">
        {/* Sidebar */}
        <div className="flex flex-1 container">
        <SideBar/>
        {/* Main Content */}
        <main className="flex-1  px-6 overflow-y-auto">
          <Outlet />
        </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
