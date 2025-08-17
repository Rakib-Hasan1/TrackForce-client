import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaQuoteLeft } from "react-icons/fa";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import LoadingEffect from "./LoadingEffect";

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
      <LoadingEffect/>
    );
  }

  return (
    <section className="bg-base-200 text-base-content py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-primary mb-3 mozilla">
          What People Say
        </h2>
        <p className="text-base-content/70 mb-10">
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

            return (
              <SwiperSlide key={index}>
                <div
                  className={`
                    transition-all duration-500 p-6 rounded-xl m-2
                    ${isActive
                      ? "scale-100 blur-0 shadow-xl bg-base-100"
                      : "scale-90 blur-sm bg-base-200"
                    } 
                    opacity-100
                  `}
                >
                  <FaQuoteLeft className="text-2xl text-primary mb-3 mx-auto" />
                  <p className="text-base-content/90 italic mb-6">
                    "{t.quote}"
                  </p>
                  <div className="flex flex-col items-center">
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-14 h-14 rounded-full border-2 border-primary mb-2 object-cover"
                    />
                    <h4 className="font-semibold text-base-content">
                      {t.name}
                    </h4>
                    <span className="text-sm text-base-content/70">
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
