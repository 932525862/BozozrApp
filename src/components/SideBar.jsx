import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="p-[16px] flex flex-col gap-[16px] bg-white rounded-[16px]">
      <Link to="/" className="hover:bg-[#06B2B6]  hover:text-white transition-all duration-200 px-[14px] py-[20px] text-[#4B4B4B] font-[500] bg-[#F9F9F9] rounded-[12px] ">
        <div className="px-[2px] flex flex-col items-center">
        <span>🏠 </span> <span>Asosiy</span>
        </div>
      </Link>
      <Link to="/brends" className="hover:bg-[#06B2B6]  hover:text-white transition-all duration-200 px-[14px] py-[20px] text-[#4B4B4B] font-[500] bg-[#F9F9F9] rounded-[12px] ">
        <div className="px-[2px] flex flex-col items-center">
        <span>🏠 </span> <span>Brendlar</span>
        </div>
      </Link>
      <Link to="/markets" className="hover:bg-[#06B2B6]  hover:text-white transition-all duration-200 px-[14px] py-[20px] text-[#4B4B4B] font-[500] bg-[#F9F9F9] rounded-[12px] ">
        <div className="px-[2px] flex flex-col items-center">
        <span>🏠 </span> <span>Bozorlik</span>
        </div>
      </Link>
      <Link to="/history" className="hover:bg-[#06B2B6]  hover:text-white transition-all duration-200 px-[14px] py-[20px] text-[#4B4B4B] font-[500] bg-[#F9F9F9] rounded-[12px] ">
        <div className="px-[2px] flex flex-col items-center">
        <span>🏠 </span> <span>Tarix</span>
        </div>
      </Link>
      <Link to="/menu" className="hover:bg-[#06B2B6]  hover:text-white transition-all duration-200 px-[14px] py-[20px] text-[#4B4B4B] font-[500] bg-[#F9F9F9] rounded-[12px] ">
        <div className="px-[2px] flex flex-col items-center">
        <span>🏠 </span> <span>Menu</span>
        </div>
      </Link>
      <Link to="/notifications" className="hover:bg-[#06B2B6]  hover:text-white transition-all duration-200 px-[14px] py-[20px] text-[#4B4B4B] font-[500] bg-[#F9F9F9] rounded-[12px] ">
        <div className="px-[2px] flex flex-col items-center">
        <span>🏠 </span> <span>Xabarnoma</span>
        </div>
      </Link>
      
    </aside>
  );
};

export default SideBar;
