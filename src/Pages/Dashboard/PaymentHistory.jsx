import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import LoadingEffect from "../../Components/LoadingEffect";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingEffect />;

  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const paginatedData = payments.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="overflow-x-auto p-4 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-blue-500 mozilla">
        Payment History
      </h2>

      <table className="table w-full bg-white dark:bg-gray-800 rounded-md shadow overflow-hidden">
        <thead className="bg-primary text-white">
          <tr>
            <th className="p-3">Month, Year</th>
            <th className="p-3">Salary</th>
            <th className="p-3">Transaction ID</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="p-3">{`${item.month}, ${item.year}`}</td>
              <td className="p-3">${item.salary}</td>
              <td className="p-3">{item.status === "paid" ? item.transactionId : item.status}</td>
              <td className="p-3">
                {item.status === "paid" ? (
                  <span className="text-green-600 font-semibold">Paid ✅</span>
                ) : (
                  <span className="text-red-500 font-semibold">Unpaid ❌</span>
                )}
              </td>
            </tr>
          ))}
          {paginatedData.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center text-gray-500 py-4">
                No payment records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {[...Array(totalPages).keys()].map((i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn btn-sm ${page === i + 1 ? "btn-primary" : "btn-outline"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
