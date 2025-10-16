import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Layout = () => {

  
  
  return (
    <div className="flex flex-col h-screen md:h-auto">
      {/* Header */}
      <div className="relative z-[999]">
      <Header/>
      </div>

      {/* Body (Sidebar + Content) */}
      <div className=" bg-[#F9F9F9] py-[16px] h-full px-[15px] relative">
        {/* Sidebar */}
        <div className="flex flex-1 container flex-col-reverse md:flex-row">
        <div className="fixed left-0 bottom-0 md:static w-full md:w-auto"><SideBar/></div>
        {/* Main Content */}
        <main className="flex-1 md:pl-[20px]  overflow-y-hidden pb-4">
          <Outlet />
        </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
