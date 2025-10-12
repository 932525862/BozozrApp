import React from 'react'
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
import LanguageSelect from './LanguageSelect';

const Header = () => {
  return (
    <header className="w-full border-b py-[25px] border-[#E0E0E0]">
        <div className='container flex justify-between'>
          <Link to="/" className='w-[147px] flex justify-center'><img src={logo} alt="market app logo" /></Link>
          <div>
            <LanguageSelect/>
          </div>
        </div>
      </header>
  )
}

export default Header