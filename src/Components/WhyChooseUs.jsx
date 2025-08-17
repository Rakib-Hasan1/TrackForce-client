import {
  FaShieldAlt,
  FaClock,
  FaUsers,
  FaChartBar,
  FaMoneyCheckAlt,
  FaCogs,
} from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaShieldAlt className="text-3xl text-primary" />,
    title: "Secure Role Access",
    description:
      "Role-based access for Admins, HRs, and Employees ensures your data is always protected.",
  },
  {
    icon: <FaClock className="text-3xl text-primary" />,
    title: "Real-Time Tracking",
    description:
      "Instant updates on employee progress and salary history with no manual syncing.",
  },
  {
    icon: <FaUsers className="text-3xl text-primary" />,
    title: "Team Management",
    description:
      "Manage employee verification, HR promotions, and firing easily from the dashboard.",
  },
  {
    icon: <FaChartBar className="text-3xl text-primary" />,
    title: "Performance Insights",
    description:
      "Visualize monthly work hours and salary comparisons with dynamic charts.",
  },
  {
    icon: <FaMoneyCheckAlt className="text-3xl text-primary" />,
    title: "Smart Payroll",
    description:
      "Avoid duplicate payments and use the built-in modal to manage monthly payrolls.",
  },
  {
    icon: <FaCogs className="text-3xl text-primary" />,
    title: "Flexible Settings",
    description:
      "Fully customizable and responsive across all screen sizes. Easy to scale anytime.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const WhyChooseUs = () => {
  return (
    <section className="bg-base-200 text-base-content py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-primary mb-4 mozilla"
        >
          Why Choose TrackForce?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base-content/70 mb-12"
        >
          Built for speed, security, and smart management – explore the benefits
          our platform brings.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="bg-base-100 rounded-xl shadow-md p-6 text-left transition hover:scale-[1.02] hover:shadow-lg duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-base-content mb-2">
                {feature.title}
              </h3>
              <p className="text-base-content/70 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
