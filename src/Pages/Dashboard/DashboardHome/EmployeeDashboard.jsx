import React from "react";
import { useQuery } from "@tanstack/react-query";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingEffect from "../../../Components/LoadingEffect";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: workData = [], isLoading } = useQuery({
    queryKey: ["works", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/works?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const monthlySummary = workData.reduce((acc, work) => {
    const monthYear = new Date(work.date).toLocaleDateString("default", {
      year: "numeric",
      month: "short",
    });
    acc[monthYear] = (acc[monthYear] || 0) + work.hours;
    return acc;
  }, {});

  if (isLoading) return <LoadingEffect />;

  return (
    <div className="bg-base-100 dark:bg-base-200 min-h-screen">
      <div className="max-w-2xl mx-auto p-6 space-y-10">
        {/* Section 1: Profile Info */}
        <section className="bg-base-200 dark:bg-base-300 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-base-content dark:text-base-100 mb-4">
            Your Profile
          </h2>
          <div className="flex items-center space-x-6">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
            />
            <div>
              <p className="text-lg font-medium text-base-content dark:text-base-100">
                {user?.displayName || "No Name"}
              </p>
              <p className="text-base-content dark:text-base-200">{user?.email}</p>
              <p className="text-base-content dark:text-base-200 capitalize">
                {user?.role || "Employee"}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Monthly Work Summary */}
        <section className="bg-base-200 dark:bg-base-300 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-base-content dark:text-base-100 mb-4">
            Monthly Work Summary
          </h2>
          {workData.length === 0 ? (
            <p className="text-base-content dark:text-base-200">No work data found.</p>
          ) : (
            <ul className="list-disc list-inside space-y-1 text-base-content dark:text-base-100">
              {Object.entries(monthlySummary).map(([month, hours]) => (
                <li key={month}>
                  <strong>{month}:</strong> {hours} hours
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
