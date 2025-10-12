import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import uzFlag from "../assets/flags/uzbekistan.png";
import enFlag from "../assets/flags/united-kingdom.png";
import ruFlag from "../assets/flags/russia.png";

const languages = [
  { code: "uz", label: "UZ", flag: uzFlag },
  { code: "uz-ru", label: "ЎЗ", flag: uzFlag },
  { code: "en", label: "ENG", flag: enFlag },
  { code: "ru", label: "RU", flag: ruFlag },
];

const LanguageSelect = () => {
  const [selected, setSelected] = useState(languages[0]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (lang) => {
    setSelected(lang);
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
        className="flex cursor-pointer items-center justify-between w-28 px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-2">
          <img src={selected.flag} alt={selected.label} className="w-6 h-6 rounded-full" />
          <span className="text-sm font-medium">{selected.label}</span>
        </div>
        <IoChevronDown
          className={`text-gray-600 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          size={16}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 transform transition-all duration-300 origin-top-right
          ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        {languages.map((lang, i) => (
          <div key={lang.code}>
            <button
              onClick={() => handleSelect(lang)}
              className="flex items-center w-full gap-2 px-3 py-2 hover:bg-gray-100 rounded-xl transition"
            >
              <img src={lang.flag} alt={lang.label} className="w-6 h-6 rounded-full" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-sm font-medium">{lang.label}</span>
              </div>
            </button>
            {i < languages.length - 1 && <div className="border-t border-gray-200 mx-2" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelect;
