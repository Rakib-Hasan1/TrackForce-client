import { Link } from "react-router";
import banner from "../assets/banner.jpg";
import DarkVeil from "../../reactbits/DarkVeil/DarkVeil";

const Hero = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <DarkVeil />
      </div>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 -z-20"></div>

      {/* Content Container */}
      <div className="relative z-10 w-11/12 mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-2xl md:text-4xl font-extrabold leading-tight text-white drop-shadow-lg">
            Empowering Workforces with <br />
            <span className="text-primary">Smart Management</span>
          </h1>
          <p className="mt-6 text-lg text-gray-200 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            TrackForce helps HRs and Admins track employee performance, salary
            records, and workflow updates — all in one place. Automate work.
            Empower your team.
          </p>
          <div className="mt-8">
            <Link to="/dashboard">
              <button className="btn btn-primary btn-md shadow-lg hover:scale-105 transition-transform duration-300">
                Go to Dashboard
              </button>
            </Link>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src={banner}
            alt="TrackForce Hero Banner"
            className="w-full h-full rounded-2xl shadow-xl border-t-8 border-r-8 border-primary"
            style={{
              animation: "float 5s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Floating Animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0,0); }
          50% { transform: translate(10px, 10px); }
          75% { transform: translate(-10px, 10px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
