import { LuPlus } from "react-icons/lu";
import emptyMarket from "../../../assets/emptymarket.png";
import { useTranslation } from "react-i18next";

export default function EmptyHistory() {
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
            Bozorlik tarixi yo'q...
          </h2>
          <p className="mt-1 text-[16px] text-[#4B4B4B]">
            Faol bozorliklarni yakunlaganingizda uni tarixi ushbu bo'limda aks
            etadi
          </p>
        </div>
      </div>
    </div>
  );
}
