import { LuPlus } from "react-icons/lu";
import emptyMarket from "../../../assets/marketempty.png";
import CustomButton from "../../../components/CustomButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function EmptyMarketList({ handleOpen }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-[289px]">
        {/* Icon */}
        <div className="relative">
          <img src={emptyMarket} alt={t("emptyMarketList.imageAlt")} />
        </div>

        {/* Texts */}
        <div>
          <h2 className="text-[26px] font-[600] text-gray-800">
            {t("emptyMarketList.title")}
          </h2>
          <p className="mt-1 text-[16px] text-[#4B4B4B]">
            {t("emptyMarketList.description")}
          </p>
        </div>

        {/* Sub description */}
        <p className="mt-1 text-[12px] text-[#4B4B4B]">
          {t("emptyMarketList.subDescription")}
        </p>

        {/* Button 1: Qo‘lda qo‘shish */}
        <CustomButton
          onClick={() => handleOpen("add")}
          className="w-full"
          aria-label={t("emptyMarketList.manualAdd")}
        >
          <span>{t("emptyMarketList.manualAdd")}</span>
          <span className="bg-white w-[24px] h-[24px] flex justify-center items-center rounded-[5px] text-[#06B2B6]">
            <LuPlus className="text-[16px]" />
          </span>
        </CustomButton>

        {/* Button 2: Brend */}
        <CustomButton
          onClick={() => navigate("/brends")}
          className="w-full"
          aria-label={t("emptyMarketList.brandAdd")}
        >
          <span>{t("emptyMarketList.brandAdd")}</span>
          <span className="bg-white w-[24px] h-[24px] flex justify-center items-center rounded-[5px] text-[#06B2B6]">
            <LuPlus className="text-[16px]" />
          </span>
        </CustomButton>
      </div>
    </div>
  );
}
