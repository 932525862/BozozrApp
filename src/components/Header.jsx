import React from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/Loogo.svg";
import LanguageSelect from './LanguageSelect';
import ProfilSelect from './ProfilSelect';
import Notification from "./../assets/icons/notification-bing.svg";

const Header = () => {
  return (
    <header className="w-full border-b py-[10px] sm:py-[25px] fixed md:static px-[15px] bg-[#ffffff] z-[999] border-[#E0E0E0]">
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="w-[100px] sm:w-[147px] flex justify-center h-[35px] sm:h-[46px]">
          <img src={logo} alt="market app logo" />
        </Link>

        {/* Right side */}
        <div className="flex gap-[24px] items-center">
          {/* Desktopda ko‘rinadigan LanguageSelect */}
          <div className="hidden md:block">
            <LanguageSelect />
          </div>

          <div className="h-full w-[1px] bg-[#E0E0E0] hidden md:block"></div>

          {/* Desktopda ko‘rinadigan ProfilSelect */}
          <div className="hidden md:block">
            <ProfilSelect />
          </div>

          {/* Mobil ekranda Notification + LanguageSelect ko‘rinadi */}
          <div className="flex items-center gap-[16px] md:hidden">
            {/* Notification button (mobil formatda) */}
            <Link
              to="/notifications"
              className="flex items-center justify-center w-[35px] h-[35px] rounded-full hover:bg-[#06b2b6] transition"
            >
              <img
                src={Notification}
                alt="Notification"
                className="w-[30px] h-[30px]"
              />
            </Link>

            {/* LanguageSelect */}
            <LanguageSelect />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
