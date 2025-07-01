import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Zoom } from "react-awesome-reveal";
import { Tooltip } from "react-tooltip";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
    heading: "Find the Best Alternatives",
    subheading: "Compare and discover product recommendations from real users",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1350&q=80",
    heading: "Ask the Community",
    subheading: "Post your queries and get trusted alternatives from others",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1350&q=80",
    heading: "Share What Works for You",
    subheading: "Help others by recommending products you love and trust",
  },
];


const Banner = () => {
  return (
    <div className="relative ">
      <Swiper
        className="mySwiper"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        speed={1000}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[80vh] w-full">
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.heading}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-opacity-50"></div>

              {/* Text Content */}
              <div className="absolute inset-0 text-center px-6 flex flex-col items-center justify-center">
                <span
                  data-tooltip-id="my-tooltip-1"
                  className="bg-[rgba(0,0,0,0.7)] text-slate-100 p-10 rounded-2xl text-center flex flex-col items-center justify-center"
                >
                  <Zoom>
                    <h1 className="text-3xl sm:text-5xl font-bold mb-4 drop-shadow-lg animate-fadeInUp">
                      {slide.heading}
                    </h1>
                    <p className="text-lg sm:text-xl max-w-xl drop-shadow-md animate-fadeInUp delay-200 text-center">
                      {slide.subheading}
                    </p>
                  </Zoom>
                </span>
                <Tooltip
                  id="my-tooltip-1"
                  place="top"
                  content="Best of Luck for Your Roommate"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
