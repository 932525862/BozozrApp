import { LuPlus } from "react-icons/lu";
import emptyMarket from "../../../assets/emptymarket.png";
import CustomButton from "../../../components/CustomButton";
import { useTranslation } from "react-i18next";

export default function EmptyShoppingList({handleOpen}) {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-[289px]">
        {/* Icon */}
        <div className="relative">
          <img src={emptyMarket} alt={t("emptyShoppingList.imageAlt")} />
        </div>

        {/* Texts */}
        <div>
          <h2 className="text-[26px] font-[600] text-gray-800">
            {t("emptyShoppingList.title")}
          </h2>
          <p className="mt-1 text-[16px] text-[#4B4B4B]">
            {t("emptyShoppingList.description")}
          </p>
        </div>

        {/* Button */}
        <CustomButton onClick={() => handleOpen("add")} className="w-full" aria-label={t("emptyShoppingList.createButton")}>
          <span>{t("emptyShoppingList.createButton")}</span>
          <span className="bg-white w-[24px] h-[24px] flex justify-center items-center rounded-[5px] text-[#06B2B6]">
            <LuPlus className="text-[16px]" />
          </span>
        </CustomButton>

      </div>
    </div>
  );
}
