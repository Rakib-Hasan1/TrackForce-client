import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingEffect from "../../Components/LoadingEffect";

const months = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const Progress = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [employeeEmails, setEmployeeEmails] = useState([]);

  // Fetch unique employee emails
  useEffect(() => {
    axiosSecure.get("/peoples").then((res) => {
      const emails = res.data.map((person) => person.email);
      setEmployeeEmails(emails);
    });
  }, [axiosSecure]);

  const { data: workRecords = [], isLoading } = useQuery({
    queryKey: ["progress", selectedMonth, selectedEmail],
    queryFn: async () => {
      const res = await axiosSecure.get("/progress", {
        params: {
          month: selectedMonth,
          email: selectedEmail,
        },
      });
      return res.data;
    },
    enabled: !!selectedMonth, // only run when month is selected
  });

  return (
    <div className="p-4 bg-base-200 min-h-screen rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-500 mozilla">
        Employee Work Progress
      </h2>

      <div className="flex gap-4 mb-6 flex-wrap justify-center">
        {/* Month Filter */}
        <select
          className="select border border-blue-300 px-4 py-2 rounded-md w-full md:w-1/4 cursor-pointer bg-base-100  text-base-content "
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        {/* Email Filter */}
        <select
          className="select border border-blue-300 px-4 py-2 rounded-md w-full md:w-1/4 cursor-pointer bg-base-100 text-base-content"
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
        >
          <option value="">All Employees</option>
          {employeeEmails.map((email) => (
            <option key={email} value={email}>
              {email}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <LoadingEffect />
      ) : workRecords.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="table w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Task</th>
                <th className="p-3 text-left">Hours</th>
              </tr>
            </thead>
            <tbody>
              {workRecords.map((record) => (
                <tr key={record._id} className="hover:bg-base-300">
                  <td className="p-3 text-base-content">{new Date(record.date).toLocaleDateString()}</td>
                  <td className="p-3 text-base-content">{record.email}</td>
                  <td className="p-3 text-base-content">{record.task}</td>
                  <td className="p-3 text-base-content">{record.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : selectedMonth ? (
        <p className="text-center text-gray-500 mt-6">
          No records found for selected filters.
        </p>
      ) : (
        <p className="text-center text-gray-400 mt-6">
          Please select a month to view data.
        </p>
      )}
    </div>

  );
};

export default Progress;
