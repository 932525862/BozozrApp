import React from 'react'
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
import LanguageSelect from './LanguageSelect';
import ProfilSelect from './ProfilSelect';

const Header = () => {
  return (
    <header className="w-full border-b py-[25px] border-[#E0E0E0]">
        <div className='container flex justify-between'>
          <Link to="/" className='w-[147px] flex justify-center h-[46px]'><img src={logo} alt="market app logo" /></Link>
          <div className='flex gap-[24px]'>
            <LanguageSelect/>
            <div className='h-full w-[1px] bg-[#E0E0E0]'></div>
            <ProfilSelect/>
          </div>
        </div>
      </header>
  )
}

export default Header