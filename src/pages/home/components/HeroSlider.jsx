// BozorAppCoverflowSwiper.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      bgGradient: "from-green-500 to-green-700",
      title: "BOZORAPP BILAN\nXARIDINGIZNI TEJANG",
      subtitle: "Bozorlikni endi tartibli qilamiz",
      buttonColor: "text-green-600",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      )
    },
    {
      id: 2,
      bgGradient: "from-blue-500 to-blue-700",
      title: "ONLAYN BOZOR\nBIR JOYDA",
      subtitle: "Mahsulotlarni solishtiring va eng yaxshi narxni toping",
      buttonColor: "text-blue-600",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z"/>
        </svg>
      )
    },
    {
      id: 3,
      bgGradient: "from-orange-500 to-orange-700",
      title: "TEZKOR VA\nIShonchli ETKAZIB BERISH",
      subtitle: "Buyurtmalaringiz tez va ishonchli yetkazib beriladi",
      buttonColor: "text-orange-600",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      )
    },
    {
      id: 4,
      bgGradient: "from-purple-500 to-purple-700",
      title: "AKSIYA VA\nCHEGIRMALAR",
      subtitle: "Kunlik aksiya va chegirmalardan bahramand bo'ling",
      buttonColor: "text-purple-600",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      )
    },
    {
      id: 5,
      bgGradient: "from-red-500 to-red-700",
      title: "24/7\nMIJOZLAR XIZMATI",
      subtitle: "Har qanday savolingizga javob oling",
      buttonColor: "text-red-600",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="">
      
      <div className="w-full max-w-4xl">
        <Swiper
          modules={[Autoplay, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          spaceBetween={75}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: false,
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
          {slides.map((slide) => (
            <SwiperSlide 
              key={slide.id} 
              className="!w-[670px] !h-[264px] transition-all duration-300"
            >
              <div className={`relative w-full h-full bg-gradient-to-br ${slide.bgGradient} text-white rounded-2xl p-6 flex flex-col justify-between  transform transition-transform duration-300 `}>
                {/* Logo */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-green-600 text-sm">
                    B
                  </div>
                  <span className="text-lg font-bold">BOZORAPP</span>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center">
                  <h1 className="text-xl font-bold leading-tight mb-3 whitespace-pre-line">
                    {slide.title}
                  </h1>
                  <p className="text-sm opacity-90 mb-4 leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <button className={`bg-white ${slide.buttonColor} px-4 py-2 rounded-full font-semibold text-sm w-fit shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                    Batafsil
                  </button>
                </div>

                {/* App Name */}
                <div className="text-center">
                  <h2 className="text-xl font-black">BOZOR APP</h2>
                </div>

                {/* Background Icon */}
                <div className="absolute bottom-2 right-2 w-24 h-24 opacity-20">
                  {slide.icon}
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