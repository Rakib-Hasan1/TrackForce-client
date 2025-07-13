import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import LoadingEffect from "../../Components/LoadingEffect";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-history?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingEffect></LoadingEffect>;
  const { totalPages } = payments;

  console.log(payments);

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
          {payments?.map((item) => (
            <tr key={item._id}>
              <td>{`${item.month}, ${item.year}`}</td>
              <td>{item.salary}</td>
              <td>
                {item.status === "paid" ? item.transactionId : item.status}
              </td>
              <td>
                {item.status === "paid" ? "Paid ✅" : "Pending ❌"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
    </div>
  );
};

export default PaymentHistory;
