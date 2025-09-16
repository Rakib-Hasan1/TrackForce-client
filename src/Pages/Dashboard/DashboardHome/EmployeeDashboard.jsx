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
    <div className="min-h-screen">
      <div className="p-6 flex flex-col lg:flex-row gap-5">

        {/* Section 2: Monthly Work Summary */}
        <section className="bg-base-100 border border-base-300 p-6 rounded-md">
          <h2 className="text-3xl font-bold text-blue-500 mb-4 mozilla">
            Monthly Work Summary
          </h2>
          {workData.length === 0 ? (
            <p className="text-base-content">No work data found.</p>
          ) : (
            <ul className="list-disc list-inside space-y-1 text-base-content">
              {Object.entries(monthlySummary).map(([month, hours]) => (
                <li key={month}>
                  <strong>{month}:</strong> {hours} hours
                </li>
              ))}
            </ul>
          )}
        </section>



        {/* Section 1: Profile Info */}
        <section className="bg-base-100 p-6 border border-base-300 rounded-md">
          <h2 className="text-3xl font-bold mb-4 text-blue-500 mozilla">
            Your Profile
          </h2>
          <div className="flex items-center space-x-6">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
            />
            <div>
              <p className="text-lg font-medium text-base-content">
                {user?.displayName || "No Name"}
              </p>
              <p className="text-base-content">{user?.email}</p>
              <p className="text-base-content capitalize">
                {user?.role || "Employee"}
              </p>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
};

export default EmployeeDashboard;
