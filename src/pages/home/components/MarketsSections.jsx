import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrNext } from "react-icons/gr";
import CustomButton from "../../../components/CustomButton";
import { LuPlus } from "react-icons/lu";
import CustomModal from "../../../components/CustomModal";
import AddMarketForm from "../../markets/components/AddMarketForm";
import { Swiper, SwiperSlide } from "swiper/react";
import bgStar from "../../../assets/star.png";
import ticketImg from "../../../assets/icons/receipt.svg"
import moneyImg from "../../../assets/icons/Frame.svg"
import calendarImg from "../../../assets/icons/calendar-tick.svg"

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

const MarketsSections = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/markets");
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="mt-[12px] flex gap-[16px]">
      <div>
        <CustomButton onClick={handleOpen} className="h-full w-[65px] px-[2px]">
          <span className="bg-white w-[24px] h-[24px] flex justify-center items-center rounded-[5px] text-[#06B2B6]">
            <LuPlus className="text-[16px]" />
          </span>
        </CustomButton>
      </div>
      <div className="bg-[#FFFFFF] shadow-[0_4px_12px_#1E1E1E0A] rounded-[12px] py-[12px] px-[16px] max-w-[685px]">
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
            slidesPerView={1.8}
            spaceBetween={12}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div
                onClick={handleNavigate}
                className="cursor-pointer bg-[#F9F9F9] w-[max-content] rounded-[16px] py-[8px] px-[12px] flex gap-[12px]"
              >
                <div
                  className="w-[52px] h-[52px] flex justify-center items-center font-[600] text-[22px]"
                  style={{
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right center",
                    backgroundImage: `url(${bgStar})`,
                  }}
                >
                  O
                </div>
                <div>
                    <div className="font-[600]">Oilam: <span className="font-[500] text-[14px] text-[#06B2B6]">#bozorlik14</span></div>
                    <div className="flex gap-[10px] items-center">
                        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                            <img src={ticketImg} alt="photo" />
                            <span>55</span>
                        </div>
                        <div className="w-[2px] h-[18px] bg-[#4B4B4B] "></div>
                        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                            <img src={moneyImg} alt="photo" />
                            <span>5 555 555</span>
                        </div>
                        <div className="w-[2px] h-[18px] bg-[#4B4B4B]"></div>
                        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                            <img src={calendarImg} alt="photo" />
                            <span>05.05.2025</span>
                        </div>
                    </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                onClick={handleNavigate}
                className="cursor-pointer bg-[#F9F9F9] w-[max-content] rounded-[16px] py-[8px] px-[12px] flex gap-[12px]"
              >
                <div
                  className="w-[52px] h-[52px] flex justify-center items-center font-[600] text-[22px]"
                  style={{
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right center",
                    backgroundImage: `url(${bgStar})`,
                  }}
                >
                  O
                </div>
                <div>
                    <div className="font-[600]">Oilam: <span className="font-[500] text-[14px] text-[#06B2B6]">#bozorlik14</span></div>
                    <div className="flex gap-[10px] items-center">
                        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                            <img src={ticketImg} alt="photo" />
                            <span>55</span>
                        </div>
                        <div className="w-[2px] h-[18px] bg-[#4B4B4B] "></div>
                        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                            <img src={moneyImg} alt="photo" />
                            <span>5 555 555</span>
                        </div>
                        <div className="w-[2px] h-[18px] bg-[#4B4B4B]"></div>
                        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                            <img src={calendarImg} alt="photo" />
                            <span>05.05.2025</span>
                        </div>
                    </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                onClick={handleNavigate}
                className="cursor-pointer bg-[#F9F9F9] w-[max-content] rounded-[16px] py-[8px] px-[12px] flex gap-[12px]"
              >
                <div
                  className="w-[52px] h-[52px] flex justify-center items-center font-[600] text-[22px]"
                  style={{
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right center",
                    backgroundImage: `url(${bgStar})`,
                  }}
                >
                  O
                </div>
                <div>
                    <div className="font-[600]">Oilam: <span className="font-[500] text-[14px] text-[#06B2B6]">#bozorlik14</span></div>
                    <div className="flex gap-[10px] items-center">
                        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                            <img src={ticketImg} alt="photo" />
                            <span>55</span>
                        </div>
                        <div className="w-[2px] h-[18px] bg-[#4B4B4B] "></div>
                        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                            <img src={moneyImg} alt="photo" />
                            <span>5 555 555</span>
                        </div>
                        <div className="w-[2px] h-[18px] bg-[#4B4B4B]"></div>
                        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                            <img src={calendarImg} alt="photo" />
                            <span>05.05.2025</span>
                        </div>
                    </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                onClick={handleNavigate}
                className="cursor-pointer bg-[#F9F9F9] w-[max-content] rounded-[16px] py-[8px] px-[12px] flex gap-[12px]"
              >
                <div
                  className="w-[52px] h-[52px] flex justify-center items-center font-[600] text-[22px]"
                  style={{
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right center",
                    backgroundImage: `url(${bgStar})`,
                  }}
                >
                  O
                </div>
                <div>
                    <div className="font-[600]">Oilam: <span className="font-[500] text-[14px] text-[#06B2B6]">#bozorlik14</span></div>
                    <div className="flex gap-[10px] items-center">
                        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                            <img src={ticketImg} alt="photo" />
                            <span>55</span>
                        </div>
                        <div className="w-[2px] h-[18px] bg-[#4B4B4B] "></div>
                        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                            <img src={moneyImg} alt="photo" />
                            <span>5 555 555</span>
                        </div>
                        <div className="w-[2px] h-[18px] bg-[#4B4B4B]"></div>
                        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                            <img src={calendarImg} alt="photo" />
                            <span>05.05.2025</span>
                        </div>
                    </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                onClick={handleNavigate}
                className="cursor-pointer bg-[#F9F9F9] w-[max-content] rounded-[16px] py-[8px] px-[12px] flex gap-[12px]"
              >
                <div
                  className="w-[52px] h-[52px] flex justify-center items-center font-[600] text-[22px]"
                  style={{
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right center",
                    backgroundImage: `url(${bgStar})`,
                  }}
                >
                  O
                </div>
                <div>
                    <div className="font-[600]">Oilam: <span className="font-[500] text-[14px] text-[#06B2B6]">#bozorlik14</span></div>
                    <div className="flex gap-[10px] items-center">
                        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                            <img src={ticketImg} alt="photo" />
                            <span>55</span>
                        </div>
                        <div className="w-[2px] h-[18px] bg-[#4B4B4B] "></div>
                        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                            <img src={moneyImg} alt="photo" />
                            <span>5 555 555</span>
                        </div>
                        <div className="w-[2px] h-[18px] bg-[#4B4B4B]"></div>
                        <div className="text-[14px] text-[#4B4B4B] flex gap-1 items-center font-[500]">
                            <img src={calendarImg} alt="photo" />
                            <span>05.05.2025</span>
                        </div>
                    </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <CustomModal
        open={open}
        title="Yangi bozorlik"
        onCancel={handleClose}
        width={351}
      >
        <AddMarketForm />
      </CustomModal>
    </div>
  );
};

export default MarketsSections;
