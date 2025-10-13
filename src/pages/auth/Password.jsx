import React, { useState } from "react";
import { Input } from "antd";
import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import { Eye, EyeOff } from "lucide-react";
import Uzb from "../../assets/left-part.svg";
import Eng from "../../assets/eng.svg";
import Rus from "../../assets/rus.svg";
import Kiril from "../../assets/krill.svg";
import Option from "../../assets/option.svg";
import uzFlag from "../../assets/flags/uzbekistan.png";
import uzcFlag from "../../assets/flags/uzbekistan.png";
import engFlag from "../../assets/flags/united-kingdom.png";
import ruFlag from "../../assets/flags/russia.png";

const Password = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("+998 ");
  const [selectedLang, setSelectedLang] = useState("UZ");

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    if (!input.startsWith("+998")) {
      setPhone("+998 ");
    } else {
      setPhone(input);
    }
  };

//   const handleCheckboxChange = (e) => {
//     const checkbox = e.target;
//     checkbox.style.backgroundColor = checkbox.checked ? "#06B2B6" : "#FFFFFF";
//   };

  const getLangImage = () => {
    switch (selectedLang) {
      case "ENG":
        return Eng;
      case "RU":
        return Rus;
      case "ЎЗ":
        return Kiril;
      default:
        return Uzb;
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden px-4 sm:px-6">
      {/* 🔵 Dekor doiralar */}
      <div className="absolute w-[471px] h-[471px] bg-[#06B2B6] rounded-full top-[-111px] left-[1098px] hidden md:block" />
      <div className="absolute w-[471px] h-[471px] bg-[#06B2B6] rounded-full top-[520px] left-[-39px] hidden md:block" />

      {/* 📦 LoginCard */}
      <div className="relative z-10 flex flex-col items-center bg-white rounded-[12px] shadow-[0px_2px_6px_0px_#2553B91A] w-full max-w-[960px] md:h-[706px] p-5 md:p-[30px] gap-[20px] md:gap-[30px]">
        {/* 🌐 Language selector */}
        <div className="flex gap-2 md:gap-4 justify-center mb-2 mt-1 flex-wrap">
          {[
            { code: "UZ", flag: uzFlag },
            { code: "ЎЗ", flag: uzcFlag },
            { code: "ENG", flag: engFlag },
            { code: "RU", flag: ruFlag },
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`flex items-center justify-center rounded-[16px] border-2 bg-white transition-all duration-300 
                ${
                  selectedLang === lang.code
                    ? "border-[#06B2B6]"
                    : "border-[#E0E0E0] hover:border-[#06B2B6]"
                }
                w-[80px] h-[48px] md:w-[103px] md:h-[56px] px-3 md:px-4 py-2 md:py-3`}
            >
              <img
                src={lang.flag}
                alt={lang.code}
                className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] mr-1 md:mr-2"
              />
              <span className="text-[#1A1A1A] text-sm md:text-base font-medium">
                {lang.code}
              </span>
            </button>
          ))}
        </div>

        {/* 🔹 Kontent (chap + o‘ng) */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full bg-white rounded-[12px] gap-[30px] md:h-[560px]">
          {/* 🟢 Chap (Rasm qismi) */}
          <div className="hidden md:flex items-center justify-center w-[435px] h-[560px] rounded-[12px] overflow-hidden bg-transparent">
            <img
              src={getLangImage()}
              alt="App preview"
              className="w-full h-full object-contain"
            />
          </div>

          {/* 🟣 O‘ng (forma) */}
          <div className="flex flex-col w-full md:w-[435px] md:h-[512px] p-2 rounded-[12px] relative">
            <div className="mb-2 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-[#1E1E1E]">
                Parolni tiklash
              </h2>
              <p className="text-sm text-[#1E1E1E]/60 mt-2">
                Iltimos, parolingizni tiklash uchun kerakli ma’lumotlarni
                kiriting.
              </p>
            </div>

            {/* ⭐ Dekor chiziq */}
            <div className="flex w-full md:w-[435px] h-[40px] md:h-[50px] rounded-[12px] overflow-hidden bg-transparent justify-center md:justify-start mt-3">
              <img
                src={Option}
                alt="option"
                className="w-[300px] md:w-[400px] h-auto bg-transparent"
              />
            </div>

            {/* 🔢 Inputs */}
            <div className="flex flex-col gap-3 mt-4">
              {/* 📞 Telefon input */}
              <div>
                <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
                  *Telefon
                </label>
                <Input
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="rounded-[12px] border-2 border-[#E0E0E0] hover:border-[#06B2B6] px-4 py-2 h-[48px] transition-all duration-300"
                />
              </div>

              {/* 🔒 Parol input */}
              <div className="relative">
                <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
                  *Parol
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Parol"
                  className="rounded-[12px] border-2 border-[#E0E0E0] hover:border-[#06B2B6] px-4 py-2 h-[48px] transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-500 hover:text-[#06B2B6]"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
                  *Parol (qayta kiriting)
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Parol"
                  className="rounded-[12px] border-2 border-[#E0E0E0] hover:border-[#06B2B6] px-4 py-2 h-[48px] transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-500 hover:text-[#06B2B6]"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* ✅ Remember & Forgot
            <div className="flex items-center justify-between text-sm mt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 border-2 border-[#06B2B6] rounded-[4px] appearance-none outline-none cursor-pointer bg-white checked:bg-[#06B2B6]"
                />
                <span className="text-[#1E1E1E] text-sm">Meni eslab qol</span>
              </label>
              <Link to="/login" className="text-sm text-[#06B2B6] underline">
                Kirish
              </Link>
            </div> */}

            {/* 🆕 Akkount yaratish */}
            <div className="text-sm text-gray-600 mt-8 text-center md:text-left">
              Yangi foydalanuvchimisiz?{" "}
              <Link
                to="/Registir"
                className="underline font-semibold text-[#06B2B6]"
              >
                Akkount yaratish
              </Link>
            </div>

            {/* 🔘 Davom etish tugmasi */}
            <div className="mt-4">
              <CustomButton className="w-full py-3 rounded-[12px] bg-[#06B2B6] text-white font-medium hover:opacity-90 transition mt-5">
                Davom etish
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
