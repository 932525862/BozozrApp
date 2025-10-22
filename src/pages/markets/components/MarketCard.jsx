import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatDateDot, formatNumberWithSpace, getLangValue } from "../../../utils/utils";
import ticketImg from "../../../assets/icons/receipt.svg";
import moneyImg from "../../../assets/icons/Frame.svg";
import calendarImg from "../../../assets/icons/calendar-tick.svg";
import bgStar from "../../../assets/star.png";
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
  const {user} = useStore()

  const handleNavigate = () => {
    navigate(`/market/${market?.name}`, {
      state: { id: market?.id },
    });
  };
  
  const handleClick = (type) => {
    setSelectMarket(market)
    handleOpen(type);
    setPopoverOpen(false); // 🔹 modal ochilgandan so‘ng Popover yopiladi
  };


  // language-ga qarab serverdagi title maydonini tanlash (fallback uz)
  const typeTitle = getLangValue(market?.marketType, "title", i18n?.language)

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
      {
        user?.id == market?.marketCreator && <div onClick={() => handleClick("edit")} className="flex gap-[16px] items-center cursor-pointer max-w-[152px] justify-between pb-[8px] border-b border-[#E0E0E0]">
        <img src={editImg} alt={t("marketCard.editIconAlt")} />{" "}
        <span className="text-[18px]">{t("marketCard.edit")}</span>{" "}
        <img src={nextImg} alt={t("marketCard.nextIconAlt")} />
      </div>
      }
      <div onClick={() => handleClick("share")} className={`flex gap-[16px] items-center cursor-pointer max-w-[152px] justify-between pb-[8px] ${user?.id == market?.marketCreator ? "border-b" : ""} border-[#E0E0E0] pt-[8px]`}>
        <img src={sendImg} alt={t("marketCard.sendIconAlt")} />{" "}
        <span className="text-[18px]">{t("marketCard.share")}</span>{" "}
        <img src={nextImg} alt={t("marketCard.nextIconAlt")} />
      </div>
      {
        user?.id == market?.marketCreator && <div onClick={() => handleClick("delete")} className="flex gap-[16px] items-center cursor-pointer max-w-[152px] justify-between pt-[8px]">
        <img src={deleteImg} alt={t("marketCard.deleteIconAlt")} />{" "}
        <span className="text-[18px]">{t("marketCard.delete")}</span>{" "}
        <img src={nextImg} alt={t("marketCard.nextIconAlt")} />
      </div>
      }
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
          className="w-[102px] hidden md:flex h-[102px] justify-center items-center font-[600] text-[40px]"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundImage: `url(${bgStar})`,
          }}
        >
          {typeTitle?.charAt(0)}
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
      className="cursor-pointer md:hidden max-w-[350px] bg-[#ffffff] rounded-[16px] flex items-center gap-[12px]"
    >
      

      <div
        className="w-[52px] h-[52px] flex justify-center items-center font-[600] text-[22px]"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundImage: `url(${bgStar})`,
        }}
      >
        {typeTitle?.charAt(0)}
      </div>

      <div>
        <div className="flex items-center gap-1 font-[600]">
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
