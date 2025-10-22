import React, { useState } from "react";
import { useStore } from "../../store/userStore";
import { maskUzPhone } from "../../utils/utils";
import LogoCircle from "../../assets/bozor.png";
import { useNavigate } from "react-router-dom";

import EditIcon from "../../assets/edddir.svg";
import KeyIcon from "../../assets/kalit.svg";
import PhoneIcon from "../../assets/simcard.svg";
import MessageIcon from "../../assets/edit.svg";
import DeleteIcon from "../../assets/delet.svg";
import LogOutIcon from "../../assets/logout.svg";

import MenuItem from "./components/MenuItem";
import CustomModal from "../../components/CustomModal";
import DeleteProfile from "./components/DeleteProfile";
import LeftProfile from "./components/LeftProfile";
import SendFeedback from "./components/SendFeedback";
import EditProfile from "./components/EditProfil";
import EditPassword from "./components/EditPassword";
import EditPhone from "./components/EditPhone";

import { useTranslation } from "react-i18next";

const MenuPage = () => {
  const { user, clearUser } = useStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleOpen = (type) => {
    setModalType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalType(null);
  };

  const handleLogout = () => {
    clearUser();
    navigate("/login");
    handleClose();
  };

  // 🧩 Modal ichidagi komponentni dinamik render qiluvchi funksiya
  const renderModalContent = () => {
    switch (modalType) {
      case "delete":
        return <DeleteProfile onClose={handleClose} id={user?.id} />;
      case "left":
        return <LeftProfile onClose={handleClose} handleClose={handleLogout} />;
      case "feedback":
        return <SendFeedback onClose={handleClose} />;
      case "profil":
        return <EditProfile user={user} onClose={handleClose} />;
        case "password":
        return <EditPassword onClose={handleClose} user={user}/>;
        case "phone":
        return <EditPhone onClose={handleClose} user={user}/>;
      default:
        return null;
    }
  };

  // 🏷️ Modal sarlavhasini aniqlash
  const getModalTitle = () => {
    switch (modalType) {
      case "feedback":
        return t("menuPage.feedback");
      case "profil":
        return t("menuPage.editProfile");
      case "password":
        return t("menuPage.changePassword");
      case "phone":
        return t("menuPage.changePhone");
      default:
        return t("menuPage.deleteProfile");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto">
        {/* 👤 Profil ma’lumotlari */}
        <div className="bg-white rounded-xl px-4 py-5 shadow-md mb-5">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || LogoCircle}
              alt={t("menuPage.avatarAlt")}
              className="w-16 h-16 rounded-full border-2 border-gray-100 object-cover"
            />
            <div>
              <div className="text-lg font-medium text-gray-800">{user?.fullName || t("menuPage.noName")}</div>
              <div className="text-sm text-gray-500 mt-1">{user?.phoneNumber ? maskUzPhone(user.phoneNumber) : t("menuPage.noPhone")}</div>
            </div>
          </div>
        </div>

        {/* 🔹 Birinchi guruh */}
        <div className="space-y-1 mb-4">
          <MenuItem onClick={() => handleOpen("profil")} iconSrc={EditIcon} label={t("menuPage.editProfile")} />
          <MenuItem onClick={() => handleOpen("password")} iconSrc={KeyIcon} label={t("menuPage.changePassword")} />
          <MenuItem onClick={() => handleOpen("phone")} iconSrc={PhoneIcon} label={t("menuPage.changePhone")} />
          <MenuItem onClick={() => handleOpen("feedback")} iconSrc={MessageIcon} label={t("menuPage.feedback")} />
        </div>

        {/* 🔻 Ikkinchi guruh */}
        <div className="space-y-2">
          <MenuItem onClick={() => handleOpen("left")} iconSrc={LogOutIcon} label={t("menuPage.logout")} />
          <MenuItem
            onClick={() => handleOpen("delete")}
            iconSrc={DeleteIcon}
            label={t("menuPage.deleteProfile")}
            textClass="text-sm text-red-600"
          />
        </div>
      </div>

      {/* 🪟 Modal */}
      <CustomModal
        open={open}
        title={getModalTitle()}
        onCancel={handleClose}
        width={351}
      >
        {renderModalContent()}
      </CustomModal>
    </div>
  );
};

export default MenuPage;
