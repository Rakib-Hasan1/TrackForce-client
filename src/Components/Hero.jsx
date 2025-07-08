import { Link } from "react-router";
import banner from '../assets/banner.jpg'

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="w-11/12 mx-auto flex flex-col-reverse lg:flex-row items-center px-4 gap-10">
        {/* Left Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 dark:text-white leading-tight">
            Empowering Workforces with <br />
            <span className="text-blue-500">Smart Management</span>
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg max-w-xl mx-auto lg:mx-0">
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
            className="w-full h-full rounded-lg border-t-10 border-r-10 border-blue-600"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
