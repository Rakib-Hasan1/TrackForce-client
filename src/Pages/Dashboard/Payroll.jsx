import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingEffect from "../../Components/LoadingEffect";
import { useNavigate } from "react-router";

const Payroll = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: paymentRequests = [], isLoading } = useQuery({
    queryKey: ["paymentRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payment-requests");
      return res.data;
    },
  });

  const handlePay = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

  if (isLoading) return <LoadingEffect />;

  return (
    <div className="overflow-x-auto p-4 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-base-content dark:text-base-100">
        Payment Requests
      </h2>

      <table className="table w-full bg-white dark:bg-gray-800 rounded-md shadow overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">Employee</th>
            <th className="p-3 text-left">Salary</th>
            <th className="p-3 text-left">Year</th>
            <th className="p-3 text-left">Month</th>
            <th className="p-3 text-left">Requested By</th>
            <th className="p-3 text-left">Payment Date</th>
            <th className="p-3 text-left">Pay</th>
          </tr>
        </thead>
        <tbody>
          {paymentRequests.map((req) => (
            <tr key={req._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="p-3">{req.name}</td>
              <td className="p-3">${req.salary}</td>
              <td className="p-3">{req.year}</td>
              <td className="p-3">{req.month}</td>
              <td className="p-3">{req.requestedBy}</td>
              <td className="p-3">
                {req.paymentDate
                  ? new Date(req.paymentDate).toLocaleDateString()
                  : "Not paid"}
              </td>
              <td className="p-3">
                <button
                  onClick={() => handlePay(req._id)}
                  className={`btn btn-sm ${req.status === "paid" ? "btn-disabled" : "btn-success"
                    }`}
                >
                  {req.status === "paid" ? "Paid" : "Pay"}
                </button>
              </td>
            </tr>
          ))}
          {!paymentRequests.length && (
            <tr>
              <td colSpan="7" className="text-center text-gray-500 py-4">
                No payment requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Payroll;
