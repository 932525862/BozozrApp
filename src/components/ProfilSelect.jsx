import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import Logout from "../assets/icons/logout.svg"
import LogoCircle from "../assets/logo-circle.png"
import { useNavigate } from "react-router-dom";

const ProfilSelect = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate("/login")
    setOpen(false);
  };

  // 🔹 Tashqariga bosilganda dropdown yopiladi
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Tugma */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white  transition-all cursor-pointer"
      >
        <img
          src={LogoCircle}
          alt="avatar"
        //   className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col items-start">
          <p className="text-[14px] text-[#1E1E1E]">Nurullayev</p>
          <p className="text-sm text-[#4B4B4B]">99 *** 1777</p>
        </div>
        <IoChevronDown
          className={`text-gray-600 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          size={18}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-2 w-[max-content] bg-white rounded-[12px] border border-[#E0E0E0] overflow-hidden transform transition-all duration-300 origin-top-right
          ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
          <button
            onClick={handleLogout}
            className="flex items-center gap-[6px] w-full px-[14px] py-[8px] hover:bg-gray-50 transition-all text-[#1E1E1E] cursor-pointer"
          >
            <img src={Logout} alt="logout image" />
            <span className="">Profildan chiqish</span>
          </button>
      </div>
    </div>
  );
};

export default ProfilSelect;
