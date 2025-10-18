import React from "react";
import { GrNext } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import logo from "../../../assets/logo.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { useFetch } from "../../../hooks/useFetch";
import { useTranslation } from "react-i18next";
import { getLangValue } from "../../../utils/utils";

const SectionsMarket = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { data } = useFetch({
    key: [`market-type`],
    url: `/market-type`,
  });
  const handleNavigate = () => {
    navigate("/sections");
  };

  return (
    <div className="bg-[#FFFFFF] shadow-[0_4px_12px_#1E1E1E0A] rounded-[12px] py-[12px] px-[16px] mt-[16px]">
      <div className="flex justify-between">
        <div className="font-[600]">{t("sections.title")}</div>
        <Link
          to="/sections"
          className="w-[29px] h-[22px] bg-[#EFEFEF] rounded-[8px] flex justify-center items-center"
        >
          <GrNext className="text-[14px]" />
        </Link>
      </div>
      <div className="mt-[12px]">
        <Swiper
          spaceBetween={12}
          modules={[Pagination]}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            396: {
              slidesPerView: 1.2,
            },
            477: {
              slidesPerView: 1.5,
            },
            566: {
              slidesPerView: 1.8,
            },
            647: {
              slidesPerView: 2.1,
            },
            728: {
              slidesPerView: 2.4,
            },
            768: {
              slidesPerView: 1.8,
            },
            793: {
              slidesPerView: 2,
            },
            845: {
              slidesPerView: 2.2,
            },
            945: {
              slidesPerView: 2.5,
            },
          }}
        >
          {[...(data?.items ?? [])].reverse().map((item) => (
            <SwiperSlide key={item?.id}>
              <div
                onClick={handleNavigate}
                className="w-[278px] h-[178px] cursor-pointer bg-[#F9F9F9] rounded-[16px] pt-[16px] pl-[16px] pb-[25px]"
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right center",
                  backgroundImage: `url(${item?.image})`,
                }}
              >
                <div className="flex flex-col justify-between h-full">
                  <div className="font-[600] max-w-[84px]">{getLangValue(item, "title", i18n.language)}</div>
                  <div className="w-[61px] h-[36px]">
                    <img src={logo} alt={t("logoAlt")} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SectionsMarket;
