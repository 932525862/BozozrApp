// BozorAppCoverflowSwiper.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { getLangValue } from "../../../utils/utils";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/logo.png"

const SectionSwiper = ({ slides }) => {
    const {i18n, t} = useTranslation()
  return (
    <div className="">
      <div className="w-full max-w-4xl">
        <Swiper
          modules={[Autoplay, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
        //   spaceBetween={50}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            0: {
              spaceBetween: 35,
            },
            400: {
              spaceBetween: 50,
            },
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
        //   autoplay={{
        //     delay: 4000,
        //     disableOnInteraction: false,
        //   }}
          className="!h-auto !relative !pb-[15px]"
        >
          {[...(slides?.items ?? [])]?.reverse()?.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="!w-[80%] !h-[178px] md:!w-[580px] sm:!h-[210px] lg:!w-[670px] lg:!h-[264px] transition-all duration-300"
            >
              <div
                // onClick={() => setSectionId(item?.id)}
                className={` h-[178px] cursor-pointer bg-[#ffffff] rounded-[16px] pt-[16px] pl-[16px] pb-[25px]`}
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right center",
                  backgroundImage: `url(${slide?.image})`,
                }}
              >
                <div className="flex flex-col justify-between h-full">
                  <div className="font-[600] max-w-[84px]">
                    {getLangValue(slide, "title", i18n.language)}
                  </div>
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

export default SectionSwiper;
