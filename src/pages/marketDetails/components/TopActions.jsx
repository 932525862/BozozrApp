import React, { useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import CustomButton from "../../../components/CustomButton";
import { LuPlus } from "react-icons/lu";

const TopActions = () => {
  const [filter, setFilter] = useState("Olinishi kerak");
  const options = ["Olinishi kerak", "Sotib olingan"];

  return (
    <div className="flex flex-wrap gap-3 items-center justify-end">
      <div className="relative bg-white shadow-sm rounded-[15px] overflow-hidden flex items-center p-1 w-[320px] h-[42px]">
      {/* Harakatlanuvchi fon */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 h-[34px] w-[50%] rounded-[14px] bg-[#06B2B6] transition-all duration-300 ease-in-out ${
          filter === "Olinishi kerak" ? "left-1" : "left-[calc(48%)]"
        }`}
      ></div>

      {options.map((option) => (
        <button
          key={option}
          onClick={() => setFilter(option)}
          className={`relative cursor-pointer z-10 flex-1 text-[14px] font-medium py-[7px] transition-colors duration-300 ${
            filter === option ? "text-white" : "text-gray-600"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
      <div className="flex gap-[16px]">
      <CustomButton
        className="py-[8px] px-[24px]"
      >
        <span>Bozorlikni ulashish</span><FiUserPlus className="text-[16px]" />
      </CustomButton>

      <CustomButton  className="py-[8px] px-[24px]" aria-label="Yangi mahsulot">
          <span>Qo'lda qo'shish</span>
          <span className="bg-white w-[24px] h-[24px] flex justify-center items-center rounded-[5px] text-[#06B2B6]">
            <LuPlus className="text-[16px]" />
          </span>
        </CustomButton>
      </div>

      
    </div>
  );
};

export default TopActions;
