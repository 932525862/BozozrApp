import React from "react";

const CustomButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center cursor-pointer justify-center gap-2 bg-[#06B2B6] text-white font-medium text-lg px-8 py-3 rounded-2xl shadow-[0_6px_16px_rgba(0,183,179,0.4)] hover:opacity-90 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
