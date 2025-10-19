import React from "react";
import PrimaryButton from "../../../components/PrimaryButton";
import { useTranslation } from "react-i18next"; 

const LeftProfile = ({ onClose, handleClose }) => {
  const { t } = useTranslation(); 

  return (     
    <div className="w-full">
      <p className="text-[#4B4B4B] text-center mx-auto w-full text-[18px] mb-[24px]">
        {t("leftProfile.confirmLogout")}
      </p>
      <div className="flex flex-col gap-[12px]">
        <PrimaryButton
          onClick={() => handleClose()}
          className="py-[10px] rounded-[14px] bg-[#D32F2F] hover:bg-[#d32f2fbd] font-[500]"
        >
          {t("leftProfile.logout")}
        </PrimaryButton>
        <PrimaryButton
          onClick={() => onClose()}
          className="py-[10px] rounded-[14px] bg-[#EFEFEF] hover:bg-[#e2e2e2] !text-[#1E1E1E] font-[500]"
        >
          {t("leftProfile.cancel")}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default LeftProfile;
