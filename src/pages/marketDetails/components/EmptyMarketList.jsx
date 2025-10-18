import { LuPlus } from "react-icons/lu";
import emptyMarket from "../../../assets/marketempty.png";
import CustomButton from "../../../components/CustomButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function EmptyMarketList({handleOpen}) {
  const navigate = useNavigate()
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
            Mahsulotlar yo'q...
          </h2>
          <p className="mt-1 text-[16px] text-[#4B4B4B]">
          Mahsulotlar qo’shing va ro’yhatingizni shakllantiring
          </p>
        </div>

        {/* Button */}
        <p className="mt-1 text-[12px] text-[#4B4B4B]">Mahsulot qo'shishning 2 turi mavjud qo'lda va brendlardan tanlab qo'shish</p>
        <CustomButton onClick={() => handleOpen("add")} className="w-full" aria-label="Yangi mahsulot">
          <span>Qo'lda qo'shish</span>
          <span className="bg-white w-[24px] h-[24px] flex justify-center items-center rounded-[5px] text-[#06B2B6]">
            <LuPlus className="text-[16px]" />
          </span>
        </CustomButton>
        <CustomButton onClick={() => navigate("/brends")} className="w-full" aria-label="Yangi mahsulot">
          <span>Brend</span>
          <span className="bg-white w-[24px] h-[24px] flex justify-center items-center rounded-[5px] text-[#06B2B6]">
            <LuPlus className="text-[16px]" />
          </span>
        </CustomButton>

      </div>
    </div>
  );
}
