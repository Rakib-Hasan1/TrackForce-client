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
      const res = await axiosSecure.get(
        `/payment-history?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingEffect />;

  // Frontend Pagination Logic
  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const paginatedData = payments.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>
      <table className="table min-w-full bg-white shadow-md rounded-md overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th>Month, Year</th>
            <th>Salary</th>
            <th>Transaction ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item._id}>
              <td>{`${item.month}, ${item.year}`}</td>
              <td>{item.salary}</td>
              <td>
                {item.status === "paid" ? item.transactionId : item.status}
              </td>
              <td>{item.status === "paid" ? "Paid ✅" : "Unpaid ❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {[...Array(totalPages).keys()].map((i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border-blue-600 cursor-pointer"
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
