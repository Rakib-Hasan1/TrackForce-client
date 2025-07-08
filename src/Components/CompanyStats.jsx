import {
  FaUsers,
  FaTasks,
  FaMoneyCheckAlt,
  FaUserTie,
  FaClock,
} from "react-icons/fa";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Employees",
    count: 138,
    icon: <FaUsers className="text-3xl text-blue-600" />,
  },
  {
    title: "Tasks Logged",
    count: 982,
    icon: <FaTasks className="text-3xl text-blue-600" />,
  },
  {
    title: "Payments Made",
    count: 412,
    icon: <FaMoneyCheckAlt className="text-3xl text-blue-600" />,
  },
  {
    title: "HR Managers",
    count: 7,
    icon: <FaUserTie className="text-3xl text-blue-600" />,
  },
  {
    title: "Hours Tracked",
    count: 8245,
    icon: <FaClock className="text-3xl text-blue-600" />,
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const CompanyStats = () => {
  return (
    <section className="bg-white dark:bg-gray-950 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-blue-600 dark:text-white mb-4"
        >
          TrackForce In Numbers
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 mb-12"
        >
          Here's a glimpse of our platform's activity and success.
        </motion.p>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow text-center cursor-pointer"
            >
              <div className="mb-2 flex justify-center">{stat.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                <CountUp end={stat.count} duration={8} separator="," />
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyStats;
