import React from "react";

const Loding = ({ visible = true, fullScreen = true, text = "", size = "w-12 h-12" }) => {
  if (!visible) return null;

  const containerClass = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm"
    : "inline-flex items-center";

  return (
    <div className={containerClass} role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3">
        <div className={`rounded-full border-4 border-t-[4px] border-t-[#06B2B6] border-gray-200 animate-spin ${size}`} />
        {text ? <div className="text-sm text-gray-700">{text}</div> : null}
      </div>
    </div>
  );
};

export default Loding;