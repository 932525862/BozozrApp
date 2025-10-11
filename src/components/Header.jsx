import React from 'react'
import { Link, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <nav className="flex gap-4">
          <Link to="/" className="hover:text-gray-300">Bosh sahifa</Link>
          <Link to="/about" className="hover:text-gray-300">Haqida</Link>
        </nav>
      </header>
  )
}

export default Header