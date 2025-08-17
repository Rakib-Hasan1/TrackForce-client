import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-10 border-t">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-xl font-bold text-gray-800">TrackForce</h2>
          <p className="mt-2 text-sm">
            TrackForce is an efficient employee management platform to track
            work hours, manage payroll, and streamline your HR processes.
          </p>
        </div>


        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-blue-600">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/contact-us" className="hover:text-blue-600">
                Contact
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-blue-600">
                FAQ
              </a>
            </li>
          </ul>
        </div>


        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-sm">Email: dev.rakibhasan1.com</p>
          <p className="text-sm mb-3">Phone: +880-1776-073928</p>

          <div className="flex space-x-4 text-xl text-gray-600 mt-2">
            <a
              href="https://www.facebook.com/md.rakib.hasan.0001"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.linkedin.com/in/dev-mdrakib/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/Rakib-Hasan1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t mt-4">
        © {new Date().getFullYear()} TrackForce. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
