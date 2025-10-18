import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatDateDot } from "../../../utils/utils";
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

const MarketCard = ({ market, handleOpen, setSelectMarket }) => {
  const navigate = useNavigate();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleNavigate = () => {
    navigate(`/market/${market?.name}`, {
      state: { id: market?.id },
    });
  };
  
  const handleEditClick = () => {
    setSelectMarket(market)
    handleOpen("edit");
    setPopoverOpen(false); // 🔹 modal ochilgandan so‘ng Popover yopiladi
  };
  const handleDelete = () => {
    setSelectMarket(market)
    handleOpen("delete")
    setPopoverOpen(false)
  };

  // language-ga qarab serverdagi title maydonini tanlash (fallback uz)
  const typeTitle =
    (i18n?.language === "uz" ? market?.marketType?.titleUz : market?.marketType?.titleEn) ||
    market?.marketType?.titleUz ||
    "";

  const content = (
    <div>
      <div  onClick={handleEditClick} className="flex gap-[16px] items-center cursor-pointer max-w-[152px] justify-between pb-[8px] border-b border-[#E0E0E0]">
        <img src={editImg} alt={t("marketCard.editIconAlt")} />{" "}
        <span className="text-[18px]">{t("marketCard.edit")}</span>{" "}
        <img src={nextImg} alt={t("marketCard.nextIconAlt")} />
      </div>
      <div className="flex gap-[16px] items-center cursor-pointer max-w-[152px] justify-between pb-[8px] border-b border-[#E0E0E0] pt-[8px]">
        <img src={sendImg} alt={t("marketCard.sendIconAlt")} />{" "}
        <span className="text-[18px]">{t("marketCard.share")}</span>{" "}
        <img src={nextImg} alt={t("marketCard.nextIconAlt")} />
      </div>
     
        <div onClick={handleDelete} className="flex gap-[16px] items-center cursor-pointer max-w-[152px] justify-between pt-[8px]">
          <img src={deleteImg} alt={t("marketCard.deleteIconAlt")} />{" "}
          <span className="text-[18px]">{t("marketCard.delete")}</span>{" "}
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
      <div className="flex gap-[10px] flex-wrap items-center mt-[10px]">
        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
          <img src={ticketImg} alt={t("marketCard.receiptAlt")} />
          <span>{market?.marketLists?.length > 0 ? "1" : "0"}</span>
        </div>
        <div className="w-[2px] h-[18px] bg-[#4B4B4B] "></div>
        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
          <img src={moneyImg} alt={t("marketCard.moneyAlt")} />
          <span>{market?.marketLists?.length > 0 ? "1" : "0"}</span>
        </div>
        <div className="w-[2px] h-[18px] bg-[#4B4B4B]"></div>
        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
          <img src={calendarImg} alt={t("marketCard.calendarAlt")} />
          <span>{formatDateDot(market?.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
