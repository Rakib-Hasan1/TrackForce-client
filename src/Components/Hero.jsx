import { Link } from "react-router";
import banner from "../assets/banner.jpg";

const Hero = () => {
  return (
    <section className="bg-base-200 py-12 text-base-content">
      <div className="w-11/12 mx-auto flex flex-col-reverse lg:flex-row items-center px-4 gap-10">
        {/* Left Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mozilla">
            Empowering Workforces with <br />
            <span className="text-primary mozilla">Smart Management</span>
          </h1>
          <p className="mt-4 text-base-content/70 text-lg max-w-xl mx-auto lg:mx-0">
            TrackForce helps HRs and Admins track employee performance, salary
            records, and workflow updates — all in one place. Automate work.
            Empower your team.
          </p>
          <div className="mt-6">
            <Link to="/dashboard">
              <button className="btn btn-primary btn-md">
                Go to Dashboard
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image / Illustration */}
        <div className="flex-1">
          <img
            src={banner}
            alt="TrackForce Hero Banner"
            className="w-full h-full rounded-lg border-t-8 border-r-8 border-primary"
            style={{
              animation: "float 5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
       <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0,0); }
          50% { transform: translate(8px, 8px); }
          75% { transform: translateX(-8px, 8px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
