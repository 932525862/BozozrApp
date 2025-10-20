import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatDateDot, formatNumberWithSpace , getLangValue } from "../../../utils/utils";
import ticketImg from "../../../assets/icons/receipt.svg";
import moneyImg from "../../../assets/icons/Frame.svg";
import calendarImg from "../../../assets/icons/calendar-tick.svg";
import bgStar from "../../../assets/star.png";
import { Popover } from "antd";
import editImg from "../../../assets/Frame.svg";
import sendImg from "../../../assets/cheks.svg";
import nextImg from "../../../assets/market-icons/next.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomModal from "../../../components/CustomModal";

const HistoryMarketCard = ({ market, setSelectHistory, handleOpen }) => {
  const navigate = useNavigate();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { t, i18n } = useTranslation();
  // const [openModal, setOpenModal] = useState(false)

  const handleNavigate = () => {
    navigate(`/histories/${market?.name}`, {
      state: { id: market?.id },
    });
  };
  
  const handleEditClick = (type) => {
    setSelectHistory(market)
    handleOpen(type)
    setPopoverOpen(false); 
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
      <div  onClick={() => handleEditClick("again")} className="flex gap-[16px] items-center cursor-pointer max-w-[152px] justify-between pb-[8px] border-b border-[#E0E0E0]">
        <img src={editImg} alt={t("marketCard.editIconAlt")} />{" "}
        <span className="text-[18px]">{t("emptyHistory.takror")}</span>{" "}
        <img src={nextImg} alt={t("marketCard.nextIconAlt")} />
      </div>
      <div onClick={() => handleEditClick("check")} className="flex gap-[16px] items-center cursor-pointer max-w-[152px] justify-between pt-[8px]">
        <img src={sendImg} alt={t("marketCard.sendIconAlt")} />{" "}
        <span className="text-[18px]">{t("emptyHistory.chek")}</span>{" "}
        <img src={nextImg} alt={t("marketCard.nextIconAlt")} />
      </div>
    
    </div>
  );

  return (
    <div
      onClick={handleNavigate}
      className=" bg-white rounded-[16px]  p-[12px] flex flex-col justify-between relative cursor-pointer"
    >
      {/* Three dots icon */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-3 right-3 text-[#4B4B4B] cursor-pointer"
      >
        <Popover placement="bottomLeft" content={content} trigger="click"  open={popoverOpen} // 🔹 controlled holat
          onOpenChange={(open) => setPopoverOpen(open)}>
          <BsThreeDotsVertical size={18} />
        </Popover>
      </div>

      {/* Badge with letter */}
      <div className="flex flex-col items-center">
        <div
          className="w-[102px] h-[102px] flex justify-center items-center font-[600] text-[40px]"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain", // fon contentga mos ravishda
            backgroundImage: `url(${bgStar})`,
          }}
        >
          {typeTitle?.charAt(0)}
        </div>
      </div>
      <div>
        <h4 className="mt-3 text-[18px] font-semibold text-gray-800">
          {typeTitle}
        </h4>
        <p className="text-[#00AEEF] text-[16px] font-medium">
          #{market?.name}
        </p>
      </div>

      {/* Bottom icons */}
      <div className="flex gap-[10px] items-center mt-[10px] truncate">
        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
          <img src={ticketImg} alt={t("marketCard.receiptAlt")} />
          <span>{market?.marketLists?.length || "0"}</span>
        </div>
        <div className="w-[2px] h-[18px] bg-[#4B4B4B] "></div>
        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
          <img src={moneyImg} alt={t("marketCard.moneyAlt")} />
          <span>{calculateAllProducts(market?.marketLists)}</span>
        </div>
        <div className="w-[2px] h-[18px] bg-[#4B4B4B]"></div>
        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
          <img src={calendarImg} alt={t("marketCard.calendarAlt")} />
          <span className="truncate">{formatDateDot(market?.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default HistoryMarketCard;
