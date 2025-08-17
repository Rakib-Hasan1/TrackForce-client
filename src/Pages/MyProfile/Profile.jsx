import React from "react";
import useAuth from "../../hooks/useAuth";
import { FaUserAlt, FaEnvelope, FaBriefcase, FaDollarSign } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingEffect from "../../Components/LoadingEffect";

const Profile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: employeeData = {}, isLoading } = useQuery({
    queryKey: ["employee", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee/${user.email}`);
      return res.data;
    },
  });
  
  if(isLoading) {
    return <LoadingEffect/>
  }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-6 py-10 flex flex-col md:flex-row gap-6">
                {/* Profile Image */}
                <div className="flex-shrink-0 flex justify-center items-center">
                    <img
                        src={employeeData?.photo || "/default-avatar.png"}
                        alt={employeeData?.name}
                        className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400"
                    />
                </div>

                {/* Profile Info */}
                <div className="flex-1 flex flex-col justify-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mozilla">{employeeData?.name || "John Doe"}</h2>
                    <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        <FaEnvelope /> {employeeData?.email || "user@example.com"}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        <FaBriefcase /> {employeeData?.designation || "Software Engineer"} ({employeeData?.role || "Employee"})
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        <FaDollarSign /> Salary: ${employeeData?.salary || "0"}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        <MdVerified /> Status: {employeeData?.isVerified ? "Verified" : "Not Verified"}
                    </p>

                    {/* Optional Action Buttons */}
                    <div className="mt-4 flex gap-4">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition cursor-not-allowed">
                            Edit Profile
                        </button>
                        <button className="px-4 py-2 cursor-not-allowed bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition">
                            Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
