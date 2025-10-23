import React from "react";
import { FiUsers } from "react-icons/fi";
import logo from "../../../assets/Loogo.svg";
import { Progress } from "antd";
import { useTranslation } from "react-i18next"; // 🟢 i18 qo‘shildi

const ShoppingSummary = ({ total, bought, name, price }) => {
  const { t } = useTranslation(); // 🟢 Tarjima hook
  const percent = total > 0 ? (bought / total) * 100 : 0;

  return (
    <div className="bg-white shadow-md rounded-[10px] p-4 flex flex-col justify-between">
      <img
        src={logo}
        alt={t("shoppingSummary.imageAlt")}
        className="hidden sm:inline w-[134px] h-[78px] mb-2 mx-[auto]"
      />

      <div>
        <p className="text-sm text-[#4B4B4B] flex justify-between mb-[6px]">
          <span className="font-[600] text-[#1E1E1E]">
            {t("shoppingSummary.section")}:
          </span>
          <span className="font-medium">{name}</span>
        </p>

        <p className="text-sm text-[#4B4B4B] flex justify-between">
          <span className="font-[600] text-[#1E1E1E]">
            {t("shoppingSummary.amount")}:
          </span>
          <span className="font-medium">{price || 0}</span>
        </p>

        <Progress
          percent={Math.round(percent)}
          showInfo={false}
          strokeColor="#06B2B6"
        />

        <p className="text-[12px] text-[#4B4B4B] mt-1">
          {t("shoppingSummary.productsBought")}:{" "}
          <span className="font-medium">
            {bought}/{total}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ShoppingSummary;
