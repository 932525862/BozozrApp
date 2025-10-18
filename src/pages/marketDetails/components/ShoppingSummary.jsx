import React from "react";
import { FiUsers } from "react-icons/fi";
import logo from "../../../assets/logo.png"
import { Progress } from "antd";


const ShoppingSummary= ({ total, bought, name, price }) => {
    const percent = total > 0 ? (bought / total) * 100 : 0;
  return (
    <div className="bg-white shadow-md rounded-[10px] p-4 flex flex-col justify-between">
      <img src={logo} alt="Bozor App" className="w-[134px] h-[78px] mb-2 mx-[auto]" />
      <div className="">
        <p className="text-sm text-[#4B4B4B] flex justify-between mb-[6px]">
          <span className="font-[600] text-[#1E1E1E]">Bo‘lim:</span> <span className="font-medium">{name}</span>
        </p>
        <p className="text-sm text-[#4B4B4B] flex justify-between">
        <span className="font-[600] text-[#1E1E1E]">Summasi:</span><span className="font-medium">{price || 0}</span>
        </p>
        <Progress
        percent={Math.round(percent)}
        showInfo={false}
        strokeColor="#06B2B6"
      />
        <p className="text-[12px] text-[#4B4B4B] mt-1">
          Mahsulotlar sotib olindi: <span className="font-medium">{bought}/{total}</span>
        </p>
      </div>
    </div>
  );
};

export default ShoppingSummary;
