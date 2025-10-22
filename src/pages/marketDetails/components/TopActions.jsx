import React, { useEffect, useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
import CustomButton from "../../../components/CustomButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const TopActions = ({ handleOpen, setBuying, total, bought }) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState(t("topActions.filterToBuy"));
  const options = [t("topActions.filterToBuy"), t("topActions.filterBought")];
  const navigate = useNavigate()

  useEffect(() => {
    if (filter === t("topActions.filterToBuy")) {
      setBuying(false);
    } else {
      setBuying(true);
    }
  }, [filter, t, setBuying]);

  return (
    <div className="flex flex-wrap gap-3 items-center justify-end">
      {/* Filter toggle */}
      <div className="relative bg-white shadow-sm rounded-[15px] overflow-hidden flex items-center p-1 w-[320px] h-[42px]">
        <div
          className={`absolute top-1/2 -translate-y-1/2 h-[34px] w-[50%] rounded-[14px] bg-[#06B2B6] transition-all duration-300 ease-in-out ${
            filter === t("topActions.filterToBuy") ? "left-1" : "left-[calc(48%)]"
          }`}
        ></div>

        {options.map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`relative cursor-pointer z-10 flex-1 text-[14px] font-medium py-[7px] transition-colors duration-300 ${
              filter === option ? "text-white" : "text-gray-600"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-[16px]">
        {/* Bozorlikni ulashish */}
        <CustomButton
          onClick={() => handleOpen("share")}
          className="py-[8px] px-[20px] text-[14px] flex items-center justify-center gap-2"
        >
          <FiUserPlus className="text-[14px]" />
          <span className="hidden sm:inline">{t("topActions.share")}</span>
        </CustomButton>

        {/* Qo'lda qo'shish */}
        <CustomButton
          onClick={() => handleOpen("add")}
          className="py-[8px] px-[20px] text-[14px] flex items-center justify-center gap-2"
          aria-label={t("topActions.ariaNewProduct")}
        >
          <span className="bg-white w-[20px] h-[20px] flex justify-center items-center rounded-[5px] text-[#06B2B6]">
            <LuPlus className="text-[20px]" />
          </span>
          <span className="hidden sm:inline">{t("topActions.manualAdd")}</span>
        </CustomButton>
        <CustomButton
          onClick={() => navigate("/brends")}
          className="py-[8px] px-[20px] text-[14px] flex items-center justify-center gap-2"
          aria-label={t("topActions.ariaNewProduct")}
        >
          <span className="bg-white w-[20px] h-[20px] flex justify-center items-center rounded-[5px] text-[#06B2B6]">
            <LuPlus className="text-[20px]" />
          </span>
          <span className="hidden sm:inline">{t("topActions.brendAdd")}</span>
        </CustomButton>

        {/* Bozorlikni yakunlash */}
        {total === bought && (
          <CustomButton
            onClick={() => handleOpen("end")}
            className="py-[8px] px-[20px] text-[14px]"
            aria-label={t("topActions.ariaNewProduct")}
          >
            <span>{t("topActions.endShopping")}</span>
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default TopActions;
