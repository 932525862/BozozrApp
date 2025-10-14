import React from "react";

const PrimaryButton = ({ children, onClick, className = "", disabled = false, type="button" }) => {
  return (
    <button
    onClick={!disabled ? onClick : undefined}
    disabled={disabled}
    type={type}
      className={`
         text-white
        transition-transform duration-200 
        ${disabled ? "bg-[#0000001A] cursor-not-allowed" : "hover:bg-[#06A0A3] cursor-pointer bg-[#06B2B6]"}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
