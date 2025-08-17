import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingEffect from "../../Components/LoadingEffect";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const EmployeeList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { data: peoplesData = [], isLoading } = useQuery({
    queryKey: ["completedDeliveries"],
    queryFn: async () => {
      const res = await axiosSecure.get("/peoples");
      return res.data;
    },
  });

  const toggleVerifyMutation = useMutation({
    mutationFn: async ({ id, isVerified }) => {
      const res = await axiosSecure.patch(`/peoples/${id}`, {
        isVerified: !isVerified,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["peoples"]);
    },
    onError: (error) => {
      console.error("Failed to toggle verify", error);
    },
  });

  const handlePay = (employee) => {
    setSelectedEmployee(employee);
    setShowPayModal(true);
  };

  const handleSubmitPayment = async (paymentData) => {
    try {
      const res = await axiosSecure.post("/payment", {
        ...paymentData,
        status: "pending",
        requestedBy: user.email,
      });

      if (res.data.insertedId) {
        Swal.fire("Success!", "Payment request sent.", "success");
        setShowPayModal(false);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to send payment request.", "error");
    }
  };

  if (isLoading) return <LoadingEffect />;

  return (
    <div className="overflow-x-auto rounded-md">
      <table className="table table-zebra w-full bg-base-100 dark:bg-base-200 shadow-md rounded-md">
        <thead className="bg-primary text-primary-content dark:bg-primary dark:text-primary-content">
          <tr>
            <th className="p-3">Employee Image</th>
            <th className="p-3">Role</th>
            <th className="p-3">Name</th>
            <th className="p-3">Designation</th>
            <th className="p-3">Verified</th>
            <th className="p-3">Pay</th>
            <th className="p-3">View</th>
          </tr>
        </thead>
        <tbody>
          {peoplesData.map((people) => (
            <tr key={people._id} className="hover:bg-base-300 dark:hover:bg-base-400">
              <td className="p-3">
                <img
                  src={people.photo || "/default-avatar.png"}
                  className="w-14 h-14 rounded-full object-cover"
                  alt={people.name}
                />
              </td>
              <td className="p-3 text-base-content dark:text-base-100">{people.role}</td>
              <td className="p-3 text-base-content dark:text-base-100">{people.name}</td>
              <td className="p-3 text-base-content dark:text-base-100">{people.designation}</td>
              <td className="p-3">
                <button
                  className="cursor-pointer text-base-content dark:text-base-100"
                  onClick={() => {
                    Swal.fire({
                      title: people.isVerified ? "Unverify Employee?" : "Verify Employee?",
                      text: `Are you sure you want to ${people.isVerified ? "remove" : "give"} verification?`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: people.isVerified ? "Yes, Unverify" : "Yes, Verify",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        toggleVerifyMutation.mutate({
                          id: people._id,
                          isVerified: people.isVerified,
                        });

                        Swal.fire({
                          title: "Updated!",
                          text: `Employee has been ${people.isVerified ? "unverified" : "verified"}.`,
                          icon: "success",
                          timer: 1500,
                          showConfirmButton: false,
                        });
                      }
                    });
                  }}
                >
                  {people.isVerified ? "✅" : "❌"}
                </button>
              </td>
              <td className="p-3">
                <button
                  onClick={() => handlePay(people)}
                  disabled={!people.isVerified}
                  className="btn btn-sm btn-success btn-outline"
                >
                  Pay
                </button>
              </td>
              <td className="p-3">
                <Link
                  to={`/dashboard/employee-list/${people._id}`}
                  className="btn btn-sm btn-primary btn-outline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPayModal && selectedEmployee && (
        <dialog open className="modal">
          <div className="modal-box max-w-sm bg-base-100 dark:bg-base-200">
            <h3 className="font-bold text-lg mb-4 text-base-content dark:text-base-100">
              Process Payment
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const month = form.month.value;
                const year = form.year.value;

                handleSubmitPayment({
                  employeeId: selectedEmployee._id,
                  name: selectedEmployee.name,
                  email: selectedEmployee.email,
                  salary: selectedEmployee.salary,
                  month,
                  year,
                });
              }}
            >
              <div className="mb-2">
                <label className="block mb-1 text-base-content dark:text-base-100">
                  Salary
                </label>
                <input
                  type="number"
                  value={selectedEmployee.salary}
                  readOnly
                  className="input input-bordered w-full text-base-content dark:text-base-100"
                />
              </div>

              <div className="mb-2">
                <label className="block mb-1 text-base-content dark:text-base-100">Month</label>
                <input
                  type="text"
                  name="month"
                  placeholder="e.g., July"
                  required
                  className="input input-bordered w-full text-base-content dark:text-base-100"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-base-content dark:text-base-100">Year</label>
                <input
                  type="number"
                  name="year"
                  placeholder="e.g., 2025"
                  required
                  className="input input-bordered w-full text-base-content dark:text-base-100"
                />
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-success btn-sm">
                  Pay
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setShowPayModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default EmployeeList;
