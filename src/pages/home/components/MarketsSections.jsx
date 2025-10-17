import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrNext } from "react-icons/gr";
import CustomButton from "../../../components/CustomButton";
import { LuPlus } from "react-icons/lu";
import CustomModal from "../../../components/CustomModal";
import AddMarketForm from "../../markets/components/AddMarketForm";
import { Swiper, SwiperSlide } from "swiper/react";
import bgStar from "../../../assets/star.png";
import ticketImg from "../../../assets/icons/receipt.svg";
import moneyImg from "../../../assets/icons/Frame.svg";
import calendarImg from "../../../assets/icons/calendar-tick.svg";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { useFetchOne } from "../../../hooks/useFetchOne";
import { formatDateDot } from "../../../utils/utils";

const MarketsSections = () => {
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
          <span>Yangi bozorlik</span>
          <span className="bg-white w-[24px] h-[24px] flex justify-center items-center rounded-[5px] text-[#06B2B6]">
            <LuPlus className="text-[16px]" />
          </span>
        </CustomButton>
      </div>
      <div className="">
        <div className="bg-[#FFFFFF] shadow-[0_4px_12px_#1E1E1E0A] rounded-[12px] py-[12px] px-[16px]">
          <div className="flex justify-between">
            <div className="font-[600]">Bozorliklar</div>
            <Link
              to="/markets"
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
                    className="w-[52px] h-[52px] flex justify-center items-center font-[600] text-[22px]"
                    style={{
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right center",
                      backgroundImage: `url(${bgStar})`,
                    }}
                  >
                    {item?.marketType?.titleUz?.charAt(0)}
                  </div>
                  <div>
                    <div className="font-[600]">
                    {item?.marketType?.titleUz}:{" "}
                      <span className="font-[500] text-[14px] text-[#06B2B6]">
                        #{item?.name}
                      </span>
                    </div>
                    <div className="flex gap-[10px] items-center">
                      <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                        <img src={ticketImg} alt="photo" />
                        <span>{item?.marketLists?.length > 0 ? "1" : "0"}</span>
                      </div>
                      <div className="w-[2px] h-[18px] bg-[#4B4B4B] "></div>
                      <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                        <img src={moneyImg} alt="photo" />
                        <span>{item?.marketLists?.length > 0 ? "1" : "0"}</span>
                      </div>
                      <div className="w-[2px] h-[18px] bg-[#4B4B4B]"></div>
                      <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                        <img src={calendarImg} alt="photo" />
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
        title="Yangi bozorlik"
        onCancel={handleClose}
        width={351}
      >
        <AddMarketForm onClose={handleClose} refetch={refetch}/>
      </CustomModal>
    </div>
  );
};

export default MarketsSections;
