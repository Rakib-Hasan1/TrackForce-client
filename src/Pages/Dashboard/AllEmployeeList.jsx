import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingEffect from "../../Components/LoadingEffect";
import { FaThList, FaThLarge } from "react-icons/fa";

const AllEmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const [isTableView, setIsTableView] = useState(true);

  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["verifiedEmployees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/peoples/verified");
      return res.data;
    },
  });

  const handleFire = async (id, name) => {
    const confirm = await Swal.fire({
      title: `Fire ${name}?`,
      text: "They will no longer be able to log in!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, fire",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/peoples/fire/${id}`);
      Swal.fire("Fired!", `${name} has been fired.`, "success");
      refetch();
    }
  };

  const handlePromote = async (id, name) => {
    await axiosSecure.patch(`/peoples/promote/${id}`);
    Swal.fire("Promoted!", `${name} is now an HR.`, "success");
    refetch();
  };

  const handleSalaryUpdate = async (e, id) => {
    e.preventDefault();
    const salary = parseFloat(e.target.salary.value);
    if (isNaN(salary)) return;

    try {
      const res = await axiosSecure.patch(`/peoples/salary/${id}`, { salary });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Salary has been updated.", "success");
        refetch();
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "New salary must be higher than the current salary.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Update",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  if (isLoading) return <LoadingEffect />;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">All Verified Employees</h2>
        <button
          onClick={() => setIsTableView(!isTableView)}
          className="btn btn-sm btn-primary flex items-center gap-2"
        >
          {isTableView ? <FaThLarge /> : <FaThList />}
          {isTableView ? "Card View" : "Table View"}
        </button>
      </div>

      {/* Table View */}
      {isTableView ? (
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow rounded">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Designation</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Increase Salary</th>
                <th className="p-3 text-left">Make HR</th>
                <th className="p-3 text-left">Fire</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((person) => (
                <tr key={person._id}>
                  <td className="p-3">{person.name}</td>
                  <td className="p-3">{person.designation}</td>
                  <td className="p-3 capitalize">{person.role}</td>
                  <td className="p-3">
                    <form
                      onSubmit={(e) => handleSalaryUpdate(e, person._id)}
                      className="flex gap-2 items-center"
                    >
                      <input
                        type="number"
                        name="salary"
                        defaultValue={person.salary}
                        className="input input-sm input-bordered w-24"
                      />
                      <button type="submit" className="btn btn-sm btn-primary">
                        Save
                      </button>
                    </form>
                  </td>
                  <td className="p-3">
                    {person.role === "employee" && !person.isFired ? (
                      <button
                        onClick={() => handlePromote(person._id, person.name)}
                        className="btn btn-xs btn-info"
                      >
                        Make HR
                      </button>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="p-3">
                    {!person.isFired ? (
                      <button
                        onClick={() => handleFire(person._id, person.name)}
                        className="btn btn-xs btn-error"
                      >
                        Fire
                      </button>
                    ) : (
                      <span className="text-red-500 font-semibold">Fired</span>
                    )}
                  </td>
                </tr>
              ))}
              {!employees.length && (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 font-semibold py-4">
                    No verified employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        // Card View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((person) => (
            <div key={person._id} className="p-4 bg-white shadow rounded space-y-2">
              <h3 className="text-lg font-bold">{person.name}</h3>
              <p className="text-sm">Designation: {person.designation}</p>
              <p className="text-sm capitalize">Role: {person.role}</p>
              <p className="text-sm">Salary: ৳{person.salary}</p>

              <form onSubmit={(e) => handleSalaryUpdate(e, person._id)} className="flex items-center gap-2">
                <input
                  type="number"
                  name="salary"
                  defaultValue={person.salary}
                  className="input input-sm input-bordered w-full"
                />
                <button type="submit" className="btn btn-sm btn-primary">
                  Save
                </button>
              </form>

              <div className="flex gap-2 flex-wrap">
                {person.role === "employee" && !person.isFired ? (
                  <button
                    onClick={() => handlePromote(person._id, person.name)}
                    className="btn btn-xs btn-info"
                  >
                    Make HR
                  </button>
                ) : (
                  <span className="text-gray-400 text-sm">Already HR</span>
                )}

                {!person.isFired ? (
                  <button
                    onClick={() => handleFire(person._id, person.name)}
                    className="btn btn-xs btn-error"
                  >
                    Fire
                  </button>
                ) : (
                  <span className="text-red-500 font-semibold text-sm">Fired</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEmployeeList;
