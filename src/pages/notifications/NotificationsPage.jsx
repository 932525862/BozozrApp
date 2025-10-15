import React, { useState } from "react";
import chekImg from "../../assets/chek.svg"
const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState("barchasi");

  const tabs = [
    { id: "barchasi", label: "Barchasi" },
    { id: "oqilmagan", label: "O‘qilmagan" },
    { id: "oqilgan", label: "O‘qilgan" },
  ];

  
  const notifications = [
    {
      id: 1,
      title: "Market App – Bozorni elektron hisobda yuring!",
      date: "April 13, 2025 at 10:00 AM",
    },
    {
      id: 2,
      title: "+998 90 *** 7777 (Azimjon) foydalanuvchi sizga bozorlik ulashdi",
      date: "April 13, 2025 at 10:00 AM",
    },
    {
      id: 3,
      title: "Welcome to BozorApp v1.5 — Enjoy the new features",
      date: "April 13, 2025 at 10:00 AM",
    },
    {
      id: 4,
      title: "Welcome to BozorApp v1.5 — Enjoy the new features",
      date: "April 13, 2025 at 10:00 AM",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4 py-6">

      
      <div className="w-[90%] max-w-[550px] bg-white rounded-[12px] p-2 flex justify-between items-center gap-3 shadow-sm">
        <div className="flex justify-between items-center gap-3 w-[90%]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-[32%] h-[34px] rounded-[14px] text-sm font-medium transition-colors duration-300
              ${
                activeTab === tab.id
                  ? "bg-[#06B2B6] text-white"
                  : "bg-transparent border border-[#06B2B6] text-[#06B2B6] hover:bg-[#06B2B6] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      
        <button
          className="
            w-[39px] h-[32px]
            flex items-center justify-center
            gap-[6px]
            rounded-[8px]
            
          "
        >
          <img
            src={chekImg}
            alt="check icon"
            className="w-[34px] h-[34px] object-contain"
          />
        </button>
      </div>

      
      <div className="flex flex-col gap-3 w-[90%] max-w-[550px]">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="
              w-full h-[64px] bg-white rounded-[12px] px-[4%] py-2
              border-2 border-transparent flex flex-col justify-center relative
              transition-all duration-300 hover:border-[#06B2B6]
            "
          >
            <p className="text-sm font-medium text-[#1E1E1E] truncate">
              {item.title}
            </p>
            <span className="text-xs text-gray-500 mt-1">{item.date}</span>

           
            <span
              className="
                absolute top-1/2 right-3 -translate-y-1/2
                w-2.5 h-2.5 rounded-full bg-[#06B2B6]
                opacity-0 hover:opacity-100 transition-opacity duration-300
              "
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
