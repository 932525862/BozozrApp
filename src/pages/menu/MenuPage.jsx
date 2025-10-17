import React from 'react'
import { useStore } from '../../store/userStore'
import { maskUzPhone } from '../../utils/utils'
import LogoCircle from '../../assets/bozor.png'
import { useNavigate } from 'react-router-dom' // added
import EditIcon from "../../assets/edddir.svg"
import KeyIcon from "../../assets/kalit.svg"
import PhoneIcon from "../../assets/simcard.svg"
import MessageIcon from "../../assets/edit.svg"
import DeleteIcon from "../../assets/delet.svg"
import  LogOutIcon  from "../../assets/logout.svg"
const MenuItem = ({ iconSrc, label, textClass = "text-sm text-gray-700", onClick }) => (
  <button type="button" onClick={onClick} className="w-full text-left flex items-center px-4 py-3 bg-white rounded-lg shadow-sm">
    <div className="flex items-center gap-3 flex-1">
      <div className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-md border border-gray-100">
        <img src={iconSrc} alt="" className="w-5 h-5" /> {/* o'zingiz shu joyga icon qo'ying */}
      </div>
      <span className={textClass}>{label}</span>
    </div>
  </button>
)

const MenuPage = () => {
  const { user, clearUser } = useStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    clearUser()
    navigate('/login')
  }

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-md mx-auto">
        {/* Profile card (user ma'lumotlari ProfilSelect dan olinadi) */}
        <div className="bg-white rounded-xl px-4 py-5 shadow-md mb-5">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || LogoCircle}
              alt="avatar"
              className="w-16 h-16 rounded-full border-2 border-gray-100 object-cover"
            />
            <div>
              <div className="text-lg font-medium text-gray-800">{user?.fullName || "Ism mavjud emas"}</div>
              <div className="text-sm text-gray-500 mt-1">{user?.phoneNumber ? maskUzPhone(user.phoneNumber) : ""}</div>
            </div>
          </div>
        </div>

        {/* First group */}
        <div className="space-y-1 mb-4">
          <MenuItem iconSrc={EditIcon} label="Profilni tahrirlash" />
          <MenuItem iconSrc={KeyIcon} label="Parolni o'zgartirish" />
          <MenuItem iconSrc={PhoneIcon} label="Telefon raqamni o'zgartirish" />
          <MenuItem iconSrc={MessageIcon} label="Taklif va murojaat" />
        </div>

        {/* Second group */}
        <div className="space-y-2">
          <MenuItem iconSrc={LogOutIcon} label="Profilidan chiqish" onClick={handleLogout} />
          <MenuItem iconSrc={DeleteIcon} label="Profilni o'chirish" textClass="text-sm text-red-600" />
        </div>
      </div>
    </div>
  )
}

export default MenuPage