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
import { toast } from "react-toastify";
import useApiMutation from "../../../hooks/useMutation";

const MarketCard = ({ market, refetch, handleOpen, setSelectMarket }) => {
  const navigate = useNavigate();
  const [popoverOpen, setPopoverOpen] = useState(false);
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
  const content = (
    <div>
      <div  onClick={handleEditClick} className="flex gap-[16px] items-center cursor-pointer max-w-[152px] justify-between pb-[8px] border-b border-[#E0E0E0]">
        <img src={editImg} alt="edit icon" />{" "}
        <span className="text-[18px]">Tahrirlash</span>{" "}
        <img src={nextImg} alt="edit icon" />
      </div>
      <div className="flex gap-[16px] items-center cursor-pointer max-w-[152px] justify-between pb-[8px] border-b border-[#E0E0E0] pt-[8px]">
        <img src={sendImg} alt="send icon" />{" "}
        <span className="text-[18px]">Ulashish</span>{" "}
        <img src={nextImg} alt="edit icon" />
      </div>
     
        <div onClick={handleDelete} className="flex gap-[16px] items-center cursor-pointer max-w-[152px] justify-between pt-[8px]">
          <img src={deleteImg} alt="delete icon" />{" "}
          <span className="text-[18px]">O'chirish</span>{" "}
          <img src={nextImg} alt="edit icon" />
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
          {market?.marketType?.titleUz?.charAt(0)}
        </div>
      </div>
      <div>
        <h4 className="mt-3 text-[18px] font-semibold text-gray-800">
          {market?.marketType?.titleUz}
        </h4>
        <p className="text-[#00AEEF] text-[16px] font-medium">
          #{market?.name}
        </p>
      </div>

      {/* Bottom icons */}
      <div className="flex gap-[10px] flex-wrap items-center mt-[10px]">
        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
          <img src={ticketImg} alt="photo" />
          <span>{market?.marketLists?.length > 0 ? "1" : "0"}</span>
        </div>
        <div className="w-[2px] h-[18px] bg-[#4B4B4B] "></div>
        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
          <img src={moneyImg} alt="photo" />
          <span>{market?.marketLists?.length > 0 ? "1" : "0"}</span>
        </div>
        <div className="w-[2px] h-[18px] bg-[#4B4B4B]"></div>
        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
          <img src={calendarImg} alt="photo" />
          <span>{formatDateDot(market?.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
