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

  //   const payMutation = useMutation({
  //     mutationFn: async (id) => {
  //       return await axiosSecure.patch(`/payment-requests/${id}/pay`);
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["paymentRequests"]);
  //       Swal.fire("Success", "Payment completed!", "success");
  //     },
  //     onError: () => {
  //       Swal.fire("Error", "Failed to update payment.", "error");
  //     },
  //   });

  const handlePay = (id) => {
    // proceed to the payment
    navigate(`/dashboard/payment/${id}`);
    // payMutation.mutate(id);
  };

  if (isLoading) return <LoadingEffect />;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Payroll Requests</h2>
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">Employee</th>
            <th className="p-3 text-left">Salary</th>
            <th className="p-3 text-left">Month</th>
            <th className="p-3 text-left">Year</th>
            <th className="p-3 text-left">Requested By</th>
            <th className="p-3 text-left">Payment Date</th>
            <th className="p-3 text-left">Pay</th>
          </tr>
        </thead>
        <tbody>
          {paymentRequests.map((req) => (
            <tr key={req._id}>
              <td className="p-3">{req.name}</td>
              <td className="p-3">{req.salary}৳</td>
              <td className="p-3">{req.month}</td>
              <td className="p-3">{req.year}</td>
              <td className="p-3">{req.requestedBy}</td>
              <td className="p-3">
                {req.paymentDate
                  ? new Date(req.paymentDate).toLocaleDateString()
                  : "—"}
              </td>
              <td className="p-3">
                <button
                  onClick={() => handlePay(req._id)}
                  className="btn btn-sm btn-success"
                  disabled={req.status === "paid"}
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
