import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

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

  const { data: workRecords = [], refetch } = useQuery({
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
    <div className="">
      <h2 className="text-2xl font-bold mb-6">Employee Work Progress</h2>

      <div className="flex gap-4 mb-6 flex-wrap">
        {/* Month Filter */}
        <select
          className="select border border-blue-300 px-4 py-2 rounded-md w-full md:w-1/4 cursor-pointer"
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
          className="select border border-blue-300 px-4 py-2 rounded-md w-full md:w-1/4 cursor-pointer"
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

      {/* Table */}
      {workRecords.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Email</th>
                <th>Task</th>
                <th>Hours</th>
              </tr>
            </thead>
            <tbody>
              {workRecords.map((record) => (
                <tr key={record._id}>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>{record.email}</td>
                  <td>{record.task}</td>
                  <td>{record.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : selectedMonth ? (
        <p className="text-center text-gray-500 mt-6">No records found.</p>
      ) : (
        <p className="text-center text-gray-400 mt-6">
          Please select a month to view data.
        </p>
      )}
    </div>
  );
};

export default Progress;
