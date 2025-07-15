import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaQuoteLeft } from "react-icons/fa";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";



const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const axiosInstance = useAxios();

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["ratings"],
    queryFn: async () => {
      const res = await axiosInstance.get("/rating");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading testimonials...
      </div>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-950 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-white mb-3">
          What People Say
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-10">
          Hear from our users on how TrackForce has helped simplify their work.
        </p>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 4000 }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="max-w-5xl mx-auto"
        >
          {testimonials.map((t, index) => {
            const isActive = index === activeIndex;
            const isPrev =
              index ===
              (activeIndex - 1 + testimonials.length) % testimonials.length;
            const isNext = index === (activeIndex + 1) % testimonials.length;

            return (
              <SwiperSlide key={index}>
                <div
                  className={`
                    transition-all duration-500 p-6 rounded-xl m-2
                    ${
                      isActive
                        ? "scale-100 blur-0 shadow-xl bg-white dark:bg-gray-800"
                        : "scale-90 blur-sm bg-gray-100 dark:bg-gray-700"
                    } 
                    opacity-100
                  `}
                >
                  <FaQuoteLeft className="text-2xl text-blue-500 mb-3 mx-auto" />
                  <p className="text-gray-800 dark:text-gray-200 italic mb-6">
                    "{t.quote}"
                  </p>
                  <div className="flex flex-col items-center">
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-14 h-14 rounded-full border-2 border-blue-400 mb-2 object-cover"
                    />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {t.name}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {t.role}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
