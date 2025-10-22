import React from 'react'

const MenuItem = ({ iconSrc, label, textClass = "text-sm text-gray-700", onClick }  ) => {
  return (
    <button type="button" onClick={onClick} className="w-full cursor-pointer text-left flex items-center px-4 py-3 bg-white rounded-lg shadow-sm">
    <div className="flex items-center gap-3 flex-1">
      <div className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-md border border-gray-100">
        <img src={iconSrc} alt="" className="w-5 h-5" /> {/* o'zingiz shu joyga icon qo'ying */}
      </div>
      <span className={textClass}>{label}</span>
    </div>
  </button>
  )
}

export default MenuItem