import { FaClock, FaUsers, FaChartLine, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
  {
    title: "Employee Workflow Tracking",
    description: "Monitor employee task updates and track productivity in real-time.",
    icon: <FaClock className="text-3xl text-blue-500" />,
  },
  {
    title: "Smart Payroll Management",
    description: "Manage salaries, payment history, and automate payroll approvals.",
    icon: <FaChartLine className="text-3xl text-green-500" />,
  },
  {
    title: "HR Control Panel",
    description: "HRs can verify employees, manage performance, and issue salaries easily.",
    icon: <FaUsers className="text-3xl text-purple-500" />,
  },
  {
    title: "Secure Admin Access",
    description: "Admins control permissions, salaries, and employee roles with secure access.",
    icon: <FaShieldAlt className="text-3xl text-red-500" />,
  },
];

const cardVariants = {
  offscreen: {
    opacity: 0,
    y: 50,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.8,
    },
  },
};

const Services = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-white mb-3">
          What We Offer
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          TrackForce simplifies how HRs, Admins, and Employees work together — boosting efficiency, transparency, and control.
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition-transform duration-300 hover:scale-[1.03]"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
