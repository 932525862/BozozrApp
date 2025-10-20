import React, { useEffect, useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import CustomButton from "../../../components/CustomButton";
import { LuPlus } from "react-icons/lu";

const TopActions = ({ handleOpen, setBuying, total, bought }) => {
  const [filter, setFilter] = useState("Olinishi kerak");
  const options = ["Olinishi kerak", "Sotib olingan"];

  useEffect(() => {
    if (filter == "Olinishi kerak") {
      setBuying(false);
    } else {
      setBuying(true);
    }
  }, [filter]);

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
      <div  className="flex gap-[16px]">
        <CustomButton onClick={() => handleOpen("share")} className="py-[8px] px-[20px] text-[14px]">
          <span>Bozorlikni ulashish</span>
          <FiUserPlus className="text-[14px]" />
        </CustomButton>

        <CustomButton
          onClick={() => handleOpen("add")}
          className="py-[8px] px-[20px] text-[14px]"
          aria-label="Yangi mahsulot"
        >
          <span>Qo'lda qo'shish</span>
          <span className="bg-white w-[20px] h-[20px] flex justify-center items-center rounded-[5px] text-[#06B2B6]">
            <LuPlus className="text-[14px]" />
          </span>
        </CustomButton>

        {total == bought && (
          <CustomButton
            onClick={() => handleOpen("end")}
            className="py-[8px] px-[20px] text-[14px]"
            aria-label="Yangi mahsulot"
          >
            <span>Bozorlikni yakunlash</span>
            
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default TopActions;
