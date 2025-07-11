import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingEffect from "../../Components/LoadingEffect";
import Swal from "sweetalert2";
import { Link } from "react-router";

const EmployeeList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedPerson, setSelectedPerson] = useState(null);

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

  const handlePay = (data) => {
    // TODO: proceed to payment
    console.log("proceed to payment", data);
  };

  // const handleView = (person) => {
  //   setSelectedPerson(person);
  //   // document.getElementById("profile_modal").showModal();
  // };

  if (isLoading) {
    return <LoadingEffect></LoadingEffect>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Employee Image</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Designation</th>
              <th className="p-3 text-left">Verified</th>
              <th className="p-3 text-left">Pay</th>
              <th className="p-3 text-left">View</th>
            </tr>
          </thead>
          <tbody>
            {peoplesData.map((people) => (
              <tr key={people._id} className="border-b">
                <td className="p-3">
                  <img
                    src={people.photo}
                    className="w-14 h-14 rounded-full object-cover"
                    alt=""
                  />
                </td>
                <td className="p-3">{people.role}</td>
                <td className="p-3">{people.name}</td>
                <td className="p-3">{people.designation}</td>

                <td className="p-3">
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      Swal.fire({
                        title: people.isVerified
                          ? "Unverify Employee?"
                          : "Verify Employee?",
                        text: `Are you sure you want to ${
                          people.isVerified ? "remove" : "give"
                        } verification?`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: people.isVerified
                          ? "Yes, Unverify"
                          : "Yes, Verify",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          toggleVerifyMutation.mutate({
                            id: people._id,
                            isVerified: people.isVerified,
                          });

                          Swal.fire({
                            title: "Updated!",
                            text: `Employee has been ${
                              people.isVerified ? "unverified" : "verified"
                            }.`,
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

                <td className="p-3 text-left space-x-2">
                  {people.isVerified ? (
                    <button
                      onClick={() => handlePay(people)}
                      className="btn btn-sm btn-outline btn-success"
                    >
                      Pay
                    </button>
                  ) : (
                    <button
                      disabled
                      onClick={() => handlePay(people)}
                      className="btn btn-sm btn-outline btn-success"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td className="p-3 text-left space-x-2">
                  <Link
                    to={`/dashboard/employee-list/${people._id}`}
                    className="btn btn-sm btn-outline btn-success"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {!peoplesData.length && (
              <tr>
                <td
                  colSpan="5"
                  className="font-semibold text-2xl text-center py-4 text-gray-500"
                >
                  No Employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <dialog id="profile_modal" className="modal">
        <div className="modal-box max-w-sm text-center">
          {selectedPerson && (
            <>
              {/* Profile Image */}
              <img
                src={selectedPerson.photo || "https://via.placeholder.com/120"}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />

              {/* Name */}
              <h2 className="text-2xl font-semibold mb-1">
                {selectedPerson.name}
              </h2>

              {/* Designation / Role */}
              <p className="text-gray-500 mb-3">{selectedPerson.role}</p>

              {/* Verified Status */}
              <p className="text-lg">
                Verification Status: <br />
                <span
                  className={
                    selectedPerson.isVerified
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {selectedPerson.isVerified
                    ? "✅ Verified"
                    : "❌ Not Verified"}
                </span>
              </p>
            </>
          )}

          <div className="modal-action mt-6">
            <form method="dialog">
              <button className="btn btn-sm btn-outline">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EmployeeList;
