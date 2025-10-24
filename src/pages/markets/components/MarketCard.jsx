import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  formatDateDot,
  formatNumberWithSpace,
  getLangValue,
} from "../../../utils/utils";
import ticketImg from "../../../assets/icons/receipt.svg";
import moneyImg from "../../../assets/icons/Frame.svg";
import calendarImg from "../../../assets/icons/calendar-tick.svg";
import { Popover } from "antd";
import editImg from "../../../assets/market-icons/edit.svg";
import deleteImg from "../../../assets/market-icons/delete.svg";
import sendImg from "../../../assets/market-icons/send.svg";
import nextImg from "../../../assets/market-icons/next.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "../../../store/userStore";

const MarketCard = ({ market, handleOpen, setSelectMarket }) => {
  const navigate = useNavigate();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { user } = useStore();

  const handleNavigate = () => {
    navigate(`/market/${market?.name}`, {
      state: { id: market?.id },
    });
  };

  const handleClick = (type) => {
    setSelectMarket(market);
    handleOpen(type);
    setPopoverOpen(false); // 🔹 modal ochilgandan so‘ng Popover yopiladi
  };

  // language-ga qarab serverdagi title maydonini tanlash (fallback uz)
  const typeTitle = getLangValue(market?.marketType, "title", i18n?.language);

  function calculateAllProducts(products) {
    if (!Array.isArray(products)) return "0";

    const total = products.reduce((sum, p) => {
      if (!p.isBuying) return sum; // faqat isBuying true bo'lganlar

      const { calculationType, quantity = 0, price = 0 } = p;
      const subtotal =
        calculationType === "one"
          ? quantity * price
          : calculationType === "all"
          ? price
          : 0;

      return sum + subtotal;
    }, 0);

    return formatNumberWithSpace(total);
  }
  const content = (
    <div>
      {user?.id == market?.marketCreator && (
        <div
          onClick={() => handleClick("edit")}
          className="flex gap-[16px] items-center cursor-pointer max-w-[152px] justify-between pb-[8px] border-b border-[#E0E0E0]"
        >
          <img src={editImg} alt={t("marketCard.editIconAlt")} />{" "}
          <span className="text-[18px]">{t("marketCard.edit")}</span>{" "}
          <img src={nextImg} alt={t("marketCard.nextIconAlt")} />
        </div>
      )}
      <div
        onClick={() => handleClick("share")}
        className={`flex gap-[16px] items-center cursor-pointer max-w-[152px] justify-between pb-[8px] ${
          user?.id == market?.marketCreator ? "border-b" : ""
        } border-[#E0E0E0] pt-[8px]`}
      >
        <img src={sendImg} alt={t("marketCard.sendIconAlt")} />{" "}
        <span className="text-[18px]">{t("marketCard.share")}</span>{" "}
        <img src={nextImg} alt={t("marketCard.nextIconAlt")} />
      </div>
      {user?.id == market?.marketCreator && (
        <div
          onClick={() => handleClick("delete")}
          className="flex gap-[16px] items-center cursor-pointer max-w-[152px] justify-between pt-[8px]"
        >
          <img src={deleteImg} alt={t("marketCard.deleteIconAlt")} />{" "}
          <span className="text-[18px]">{t("marketCard.delete")}</span>{" "}
          <img src={nextImg} alt={t("marketCard.nextIconAlt")} />
        </div>
      )}
    </div>
  );

  return (
    <div
      onClick={handleNavigate}
      className="bg-white rounded-[16px] py-[10px] pl-[10px] pr-[25px] sm:p-[12px] flex flex-col justify-between relative cursor-pointer"
    >
      {/* 🔹 DESKTOP versiya faqat katta ekranlarda ko‘rinadi */}
      <div className=" flex-col justify-between">
        {/* Three dots icon */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[40%] md:top-3 right-[5px] sm:right-3 text-[#4B4B4B] cursor-pointer"
        >
          <Popover
            placement="bottomLeft"
            content={content}
            trigger="click"
            open={popoverOpen}
            onOpenChange={(open) => setPopoverOpen(open)}
          >
            <BsThreeDotsVertical size={18} />
          </Popover>
        </div>

        {/* Badge with letter */}
        <div className=" hidden md:flex flex-col items-center">
          <div
            className="w-[102px] hidden md:flex h-[102px] justify-center items-center font-[600] text-[40px] relative"
          >
            <div className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="95"
                height="95"
                viewBox="0 0 95 95"
                fill="none"
              >
                <path
                  d="M41.6231 2.48864C44.7243 -0.829544 49.9864 -0.82955 53.0876 2.48864L59.5587 9.41238C61.1055 11.0673 63.292 11.9731 65.556 11.8965L75.0275 11.5765C79.5668 11.423 83.2877 15.1439 83.1342 19.6831L82.8142 29.1547C82.7376 31.4187 83.6433 33.6052 85.2983 35.152L92.2221 41.6231C95.5402 44.7243 95.5402 49.9864 92.2221 53.0876L85.2983 59.5587C83.6434 61.1055 82.7376 63.292 82.8142 65.556L83.1342 75.0275C83.2877 79.5668 79.5668 83.2877 75.0276 83.1342L65.556 82.8142C63.292 82.7376 61.1055 83.6433 59.5587 85.2983L53.0876 92.2221C49.9864 95.5402 44.7243 95.5402 41.6231 92.2221L35.152 85.2983C33.6052 83.6434 31.4187 82.7376 29.1547 82.8142L19.6831 83.1342C15.1439 83.2877 11.423 79.5668 11.5765 75.0276L11.8965 65.556C11.9731 63.292 11.0674 61.1055 9.41238 59.5587L2.48864 53.0876C-0.829544 49.9864 -0.82955 44.7243 2.48864 41.6231L9.41238 35.152C11.0673 33.6052 11.9731 31.4187 11.8965 29.1547L11.5765 19.6831C11.423 15.1439 15.1439 11.423 19.6831 11.5765L29.1547 11.8965C31.4187 11.9731 33.6052 11.0674 35.152 9.41238L41.6231 2.48864Z"
                  fill={`${
                    market?.marketType?.titleEn?.charAt(0).toLowerCase() == "f"
                      ? "#FFC266"
                      : market?.marketType?.titleEn?.charAt(0).toLowerCase() ==
                        "c"
                      ? "#66FF8C"
                      : market?.marketType?.titleEn?.charAt(0).toLowerCase() ==
                      "s"
                      ?
                       "#D966FF" : market?.marketType?.titleEn?.charAt(0).toLowerCase() ==
                       "r" ? "#66E3FF" : "#E8FF66"
                  }`} 
                />
              </svg>
            </div>
            <span className="z-30">{typeTitle?.charAt(0)}</span>
          </div>
        </div>

        <div>
          <h4 className="mt-3 hidden md:flex text-[18px] font-semibold text-gray-800">
            {typeTitle}
          </h4>
          <p className="text-[#00AEEF] hidden md:flex text-[16px] font-medium">
            #{market?.name}
          </p>
        </div>

        {/* Bottom icons */}
        <div className=" gap-[10px] hidden md:flex items-center mt-[10px] truncate">
          <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
            <img src={ticketImg} alt={t("marketCard.receiptAlt")} />
            <span>{market?.marketLists?.length || "0"}</span>
          </div>
          <div className="w-[2px] h-[18px] bg-[#4B4B4B]" />
          <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
            <img src={moneyImg} alt={t("marketCard.moneyAlt")} />
            <span>{calculateAllProducts(market?.marketLists)}</span>
          </div>
          <div className="w-[2px] h-[18px] bg-[#4B4B4B]" />
          <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
            <img src={calendarImg} alt={t("marketCard.calendarAlt")} />
            <span className="truncate">{formatDateDot(market?.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* 🔹 MOBIL versiya faqat kichik ekranlarda ko‘rinadi */}
      <div
        onClick={handleNavigate}
        className="cursor-pointer md:hidden max-w-[550px] bg-[#ffffff] rounded-[16px] flex items-center gap-[12px]"
      >
        <div
          className="w-[52px] h-[52px] flex justify-center items-center font-[600] text-[22px] relative"
          
        >
          <div className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="52"
                height="52"
                viewBox="0 0 95 95"
                fill="none"
              >
                <path
                  d="M41.6231 2.48864C44.7243 -0.829544 49.9864 -0.82955 53.0876 2.48864L59.5587 9.41238C61.1055 11.0673 63.292 11.9731 65.556 11.8965L75.0275 11.5765C79.5668 11.423 83.2877 15.1439 83.1342 19.6831L82.8142 29.1547C82.7376 31.4187 83.6433 33.6052 85.2983 35.152L92.2221 41.6231C95.5402 44.7243 95.5402 49.9864 92.2221 53.0876L85.2983 59.5587C83.6434 61.1055 82.7376 63.292 82.8142 65.556L83.1342 75.0275C83.2877 79.5668 79.5668 83.2877 75.0276 83.1342L65.556 82.8142C63.292 82.7376 61.1055 83.6433 59.5587 85.2983L53.0876 92.2221C49.9864 95.5402 44.7243 95.5402 41.6231 92.2221L35.152 85.2983C33.6052 83.6434 31.4187 82.7376 29.1547 82.8142L19.6831 83.1342C15.1439 83.2877 11.423 79.5668 11.5765 75.0276L11.8965 65.556C11.9731 63.292 11.0674 61.1055 9.41238 59.5587L2.48864 53.0876C-0.829544 49.9864 -0.82955 44.7243 2.48864 41.6231L9.41238 35.152C11.0673 33.6052 11.9731 31.4187 11.8965 29.1547L11.5765 19.6831C11.423 15.1439 15.1439 11.423 19.6831 11.5765L29.1547 11.8965C31.4187 11.9731 33.6052 11.0674 35.152 9.41238L41.6231 2.48864Z"
                  fill={`${
                    market?.marketType?.titleEn?.charAt(0).toLowerCase() == "f"
                      ? "#FFC266"
                      : market?.marketType?.titleEn?.charAt(0).toLowerCase() ==
                        "c"
                      ? "#66FF8C"
                      : market?.marketType?.titleEn?.charAt(0).toLowerCase() ==
                      "s"
                      ?
                       "#D966FF" : market?.marketType?.titleEn?.charAt(0).toLowerCase() ==
                       "r" ? "#66E3FF" : "#E8FF66"
                  }`} 
                />
              </svg>
            </div>
            <span className="z-30">{typeTitle?.charAt(0)}</span>
        </div>

        <div>
          <div className="flex items-center flex-wrap gap-1 font-[600]">
            <h4 className="text-[16px] font-semibold text-gray-800">
              {typeTitle}
            </h4>
            <span className="font-[500] text-[14px] text-[#06B2B6]">
              #{market?.name}
            </span>
          </div>
          <div className="flex gap-[10px] items-center">
            <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
              <img src={ticketImg} alt={t("markets.item.imageAlt")} />
              <span>{market?.marketLists?.length || "0"}</span>
            </div>
            <div className="w-[2px] h-[18px] bg-[#4B4B4B]" />
            <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
              <img src={moneyImg} alt={t("markets.item.imageAlt")} />
              <span>{calculateAllProducts(market?.marketLists)}</span>
            </div>
            <div className="w-[2px] h-[18px] bg-[#4B4B4B]" />
            <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
              <img src={calendarImg} alt={t("markets.item.imageAlt")} />
              <span>{formatDateDot(market?.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
