import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaUsers, FaMoneyCheckAlt, FaEnvelope, FaDollarSign } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 },
  }),
};

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-employees");
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments-history");
      return res.data;
    },
  });

  const { data: messages = [] } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/messages");
      return res.data;
    },
  });

  const totalEmployees = employees.length;
  const totalPayments = payments.length;
  const totalSalaryPaid = payments.reduce((sum, p) => sum + (Number(p.salary) || 0), 0);
  const totalMessages = messages.length;

  return (
    <div className="p-6 bg-base-100 dark:bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-base-content dark:text-base-100">
        Welcome to Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-base-200 dark:bg-base-300 rounded-lg shadow-md p-6 flex items-center space-x-4 hover:scale-105 transition-transform duration-300"
        >
          <FaUsers className="text-4xl text-blue-600" />
          <div>
            <p className="text-base-content dark:text-base-100">Total Employees</p>
            <p className="text-2xl font-semibold text-base-content dark:text-base-100">{totalEmployees}</p>
          </div>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-base-200 dark:bg-base-300 rounded-lg shadow-md p-6 flex items-center space-x-4 hover:scale-105 transition-transform duration-300"
        >
          <FaMoneyCheckAlt className="text-4xl text-green-600" />
          <div>
            <p className="text-base-content dark:text-base-100">Total Payments</p>
            <p className="text-2xl font-semibold text-base-content dark:text-base-100">{totalPayments}</p>
          </div>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-base-200 dark:bg-base-300 rounded-lg shadow-md p-6 flex items-center space-x-4 hover:scale-105 transition-transform duration-300"
        >
          <FaDollarSign className="text-4xl text-yellow-600" />
          <div>
            <p className="text-base-content dark:text-base-100">Total Salary Paid</p>
            <p className="text-2xl font-semibold text-base-content dark:text-base-100">
              {totalSalaryPaid.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </p>
          </div>
        </motion.div>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-base-200 dark:bg-base-300 rounded-lg shadow-md p-6 flex items-center space-x-4 hover:scale-105 transition-transform duration-300"
        >
          <FaEnvelope className="text-4xl text-purple-600" />
          <div>
            <p className="text-base-content dark:text-base-100">Messages</p>
            <p className="text-2xl font-semibold text-base-content dark:text-base-100">{totalMessages}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
