import React from "react";

const PrimaryButton = ({ children, onClick, className = "", disabled = false, type="button" }) => {
  return (
    <button
    onClick={!disabled ? onClick : undefined}
    disabled={disabled}
    type={type}
      className={`
        bg-[#06B2B6] text-white
        transition-transform duration-200 cursor-pointer
        ${disabled ? "opacity-60 cursor-not-allowed" : " hover:bg-[#06A0A3]"}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
