import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Carrusel() {
  return (
    <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1} 
        loop={true}
        centeredSlides={true}
        autoplay={{
        delay: 2000,
        disableOnInteraction: false,
        }}
        grabCursor={true}
    >
        {[1, 2, 3, 4].map((num) => (
        <SwiperSlide key={num}>
            <img
            src={`/images/logos/promociones/promo${num}.png`}
            alt={`Promoción ${num}`}
            className="rounded-2xl w-full object-cover"
            />
        </SwiperSlide>
        ))}
    </Swiper>

  )
}
