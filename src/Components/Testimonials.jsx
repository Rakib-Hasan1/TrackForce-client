import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaQuoteLeft } from "react-icons/fa";
import { useState } from "react";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "HR Executive",
    quote:
      "TrackForce has completely transformed how I manage payroll and employee tasks. It's intuitive, fast, and reliable.",
    photo: "https://i.ibb.co/9gVYpRd/avatar1.jpg",
  },
  {
    name: "James Roy",
    role: "Employee",
    quote:
      "I love how easy it is to submit my work updates and track my progress. The dashboard is clean and simple!",
    photo: "https://i.ibb.co/f2DtswX/avatar2.jpg",
  },
  {
    name: "Shamim Kabir",
    role: "Admin",
    quote:
      "Managing employee roles, salary, and HR permissions is effortless with TrackForce.",
    photo: "https://i.ibb.co/JvDmjzW/avatar3.jpg",
  },
  {
    name: "Emily Parker",
    role: "Project Manager",
    quote:
      "With TrackForce, I can easily coordinate with HR and monitor my team's productivity without juggling multiple tools.",
    photo: "https://i.ibb.co/jZfVN0h/avatar4.jpg",
  },
  {
    name: "Michael Liu",
    role: "Software Engineer",
    quote:
      "Submitting work logs and viewing my payment history is super simple. TrackForce saves me time every week.",
    photo: "https://i.ibb.co/yN2R6mK/avatar5.jpg",
  },
  {
    name: "Ayesha Nasrin",
    role: "HR Executive",
    quote:
      "Verifying employees and handling payroll used to take hours. Now it's all done in just a few clicks!",
    photo: "https://i.ibb.co/7Gtxdfx/avatar6.jpg",
  },
  {
    name: "John Mathews",
    role: "Marketing Lead",
    quote:
      "Great platform for mid-size teams. I can track our performance and support requests easily.",
    photo: "https://i.ibb.co/3h98Wx2/avatar7.jpg",
  },
  {
    name: "Lamia Rahman",
    role: "Admin",
    quote:
      "From firing users to promoting HRs, TrackForce gives me full control without the technical hassle.",
    photo: "https://i.ibb.co/1dW9p9m/avatar8.jpg",
  },
  {
    name: "Raihan Islam",
    role: "Support Specialist",
    quote:
      "It’s so convenient to log my daily hours and see what I did each week. Highly organized system!",
    photo: "https://i.ibb.co/TMX7GrD/avatar9.jpg",
  },
  {
    name: "Nusrat Jahan",
    role: "Data Analyst",
    quote:
      "I like how clean the dashboard is. Everything is well structured, and the HR communication is seamless.",
    photo: "https://i.ibb.co/By0KtZG/avatar10.jpg",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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
