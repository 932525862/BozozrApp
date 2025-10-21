// BozorAppCoverflowSwiper.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { useFetchOne } from '../../../hooks/useFetchOne';
import { getLangValue } from '../../../utils/utils';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  const {t,i18n} = useTranslation()

  const { data } = useFetchOne({
      key: [`bunner/all`, ],
      url: `/bunner/all`,
    });

  return (
    <div className="">
      
      <div className="w-full max-w-4xl">
        <Swiper
          modules={[Autoplay, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              centeredSlides: false,
              spaceBetween: 0,
              effect: "slide", 
              loop: true,
            },
            640: {
              slidesPerView: "auto",
              centeredSlides: true,
              spaceBetween: 75,
              effect: "coverflow",
              loop: true,
            },
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="!h-auto !relative !pb-[20px]"
        >
          {data?.map((slide) => (
            <SwiperSlide 
              key={slide.id} 
              className="!w-[full] !h-[190px] md:!w-[580px] sm:!h-[210px] lg:!w-[670px] lg:!h-[264px] transition-all duration-300"
            >
              <div style={{
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage: `url(${slide?.image})`,
                }} className={` w-full h-full text-white rounded-2xl p-6 flex flex-col justify-between  transform transition-transform duration-300 `}>
                {/* Logo */}
                

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center  w-[60%]">
                  <h1 className="text-[18px] sm:text-[22px] lg:text-[24px] font-bold leading-tight uppercase mb-3 whitespace-pre-line">
                    {getLangValue(slide, "name", i18n.language)}
                  </h1>
                  <a href={slide?.link} target='_blank' className={`bg-white cursor-pointer text-[#06B2B6] px-4 py-[6px] rounded-[8px]  font-semibold text-sm w-fit shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                   {t("barafsil")}
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
     
      </div>

    </div>
  );
};

export default HeroSlider;