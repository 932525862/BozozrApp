import React from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import LanguageSelect from './LanguageSelect';
import ProfilSelect from './ProfilSelect';

const Header = () => {
  return (
    <header className="w-full border-b py-[10px] sm:py-[25px] px-[15px] border-[#E0E0E0]">
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

          {/* Mobil ekranda faqat LanguageSelect ko‘rinadi */}
          <div className="block md:hidden">
            <LanguageSelect />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
