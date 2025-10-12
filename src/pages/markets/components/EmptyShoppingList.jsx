import { LuPlus } from "react-icons/lu";
import emptyMarket from "../../../assets/emptymarket.png";
import CustomButton from "../../../components/CustomButton";

export default function EmptyShoppingList() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-[289px]">
        {/* Icon */}
        <div className="relative">
          <img src={emptyMarket} alt="photo" />
        </div>

        {/* Texts */}
        <div>
          <h2 className="text-[26px] font-[600] text-gray-800">
            Bozorliklar yo‘q...
          </h2>
          <p className="mt-1 text-[16px] text-[#4B4B4B]">
            “Yangi bozorlik” yarating va o‘z ro‘yxatingizni shakllantiring
          </p>
        </div>

        {/* Button */}
        <CustomButton className="w-full">
          <span>Yangi bozorlik</span>
          <span className="bg-white w-[24px] h-[24px] flex justify-center items-center rounded-[5px] text-[#06B2B6]"><LuPlus className="text-[16px]" /></span>
        </CustomButton>
      </div>
    </div>
  );
}
