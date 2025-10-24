import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrNext } from "react-icons/gr";
import CustomButton from "../../../components/CustomButton";
import { LuPlus } from "react-icons/lu";
import CustomModal from "../../../components/CustomModal";
import AddMarketForm from "../../markets/components/AddMarketForm";
import { Swiper, SwiperSlide } from "swiper/react";
import ticketImg from "../../../assets/icons/receipt.svg";
import moneyImg from "../../../assets/icons/Frame.svg";
import calendarImg from "../../../assets/icons/calendar-tick.svg";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { useFetchOne } from "../../../hooks/useFetchOne";
import { formatDateDot, getLangValue } from "../../../utils/utils";
import { useTranslation } from "react-i18next";

const MarketsSections = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/markets");
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, refetch } = useFetchOne({
        key: [`market`, ],
        url: `/market`,
      });   
      
  return (
    <div className="mt-[12px] flex flex-col-reverse gap-[12px]">
      <div className="block w-full">
        <CustomButton
          onClick={handleOpen}
          className="h-full mx-[auto] py-[16px] px-[1px] sm:px-[108px] w-full sm:w-auto"
        >
          <span>{t("markets.button.create")}</span>
          <span className="bg-white w-[24px] h-[24px] flex justify-center items-center rounded-[5px] text-[#06B2B6]">
            <LuPlus className="text-[16px]" />
          </span>
        </CustomButton>
      </div>
      <div className="">
        <div className="bg-[#FFFFFF] shadow-[0_4px_12px_#1E1E1E0A] rounded-[12px] py-[12px] px-[16px]">
          <div className="flex justify-between">
            <div className="font-[600]">{t("markets.title")}</div>
            <Link
              to="/markets"
              aria-label={t("markets.viewLinkAria")}
              className="w-[29px] h-[22px] bg-[#EFEFEF] rounded-[8px] flex justify-center items-center"
            >
              <GrNext className="text-[14px]" />
            </Link>
          </div>
          <div className="mt-[12px]">
            <Swiper
              modules={[Pagination]}
              className="mySwiper"
              breakpoints={{
                0: {
                  // kichik ekranlar (mobil)
                  slidesPerView: 0.7,
                  spaceBetween: 12,
                },
                375: {
                  // kichik ekranlar (mobil)
                  slidesPerView: 0.9,
                  spaceBetween: 12,
                },
                450: {
                  // kichik ekranlar (mobil)
                  slidesPerView: 1.1,
                  spaceBetween: 12,
                },
                520: {
                  // kichik ekranlar (mobil)
                  slidesPerView: 1.3,
                  spaceBetween: 12,
                },
                599: {
                  // kichik ekranlar (mobil)
                  slidesPerView: 1.5,
                  spaceBetween: 12,
                },
                700: {
                  // kichik ekranlar (mobil)
                  slidesPerView: 1.8,
                  spaceBetween: 12,
                },
                768: {
                  // kichik ekranlar (mobil)
                  slidesPerView: 1.5,
                  spaceBetween: 12,
                },
                844: {
                  // kichik ekranlar (mobil)
                  slidesPerView: 1.7,
                  spaceBetween: 12,
                },
                913: {
                  // o‘rta ekranlar (planshet)
                  slidesPerView: 1.9,
                  spaceBetween: 12,
                },
                985: {
                  // katta ekranlar (noutbuk)
                  slidesPerView: 2.1,
                  spaceBetween: 12,
                },
              }}
            >
              {data?.map(item => 
                <SwiperSlide key={item?.id}>
                <div
                  onClick={handleNavigate}
                  className="cursor-pointer max-w-[350px] bg-[#F9F9F9] rounded-[16px] py-[8px] px-[12px] flex gap-[12px]"
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
                    item?.marketType?.titleEn?.charAt(0).toLowerCase() == "f"
                      ? "#FFC266"
                      : item?.marketType?.titleEn?.charAt(0).toLowerCase() ==
                        "c"
                      ? "#66FF8C"
                      : item?.marketType?.titleEn?.charAt(0).toLowerCase() ==
                      "s"
                      ?
                       "#D966FF" : item?.marketType?.titleEn?.charAt(0).toLowerCase() ==
                       "r" ? "#66E3FF" : "#E8FF66"
                  }`} 
                />
              </svg>
            </div>
                    <span className="z-50">{item?.marketType?.titleUz?.charAt(0)}</span>
                  </div>
                  
                  <div>
                    <div className="font-[600]">
                      {getLangValue(item?.marketType, "title", i18n.language)}:{" "}
                      <span className="font-[500] text-[14px] text-[#06B2B6]">
                        #{item?.name}
                      </span>
                    </div>
                    <div className="flex gap-[10px] items-center">
                      <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                        <img src={ticketImg} alt={t("markets.item.imageAlt")} />
                        <span>{item?.marketLists?.length > 0 ? "1" : "0"}</span>
                      </div>
                      <div className="w-[2px] h-[18px] bg-[#4B4B4B] "></div>
                      <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                        <img src={moneyImg} alt={t("markets.item.imageAlt")} />
                        <span>{item?.marketLists?.length > 0 ? "1" : "0"}</span>
                      </div>
                      <div className="w-[2px] h-[18px] bg-[#4B4B4B]"></div>
                      <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                        <img src={calendarImg} alt={t("markets.item.imageAlt")} />
                        <span>{formatDateDot(item?.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              )}
              
            </Swiper>
          </div>
        </div>
      </div>
      <CustomModal
        open={open}
        title={t("markets.modal.title")}
        onCancel={handleClose}
        width={351}
      >
        <AddMarketForm onClose={handleClose} refetch={refetch}/>
      </CustomModal>
    </div>
  );
};

export default MarketsSections;
