import React from 'react'
import { Link, Outlet } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-5 flex flex-col gap-3">
          <h2 className="text-lg font-semibold mb-3">Menyu</h2>
          <Link to="/" className="hover:bg-gray-700 p-2 rounded">🏠 Bosh sahifa</Link>
          <Link to="/about" className="hover:bg-gray-700 p-2 rounded">ℹ️ Haqida</Link>
          <Link to="/settings" className="hover:bg-gray-700 p-2 rounded">⚙️ Sozlamalar</Link>
        </aside>
  )
}

export default SideBar