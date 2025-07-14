import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingEffect from "../../../Components/LoadingEffect";

const HRDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ["workSummary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/works/summary"); // your backend API endpoint
      return res.data; // expect array of { employeeId, name, totalHours }
    },
  });

  if (isLoading) return <LoadingEffect></LoadingEffect>;
  if (error) return <div>Error loading work summary.</div>;

  return (
    <section className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Employee's Work Summary</h2>
      <table className="min-w-full text-left border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border-b border-gray-300">Employee Email</th>
            <th className="p-2 border-b border-gray-300">Total Hours</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length ? (
            data.map(({ email, totalHours }) => (
              <tr key={email} className="hover:bg-gray-50">
                <td className="p-2 border-b border-gray-300">{email}</td>
                <td className="p-2 border-b border-gray-300">{totalHours}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="p-2 text-center text-gray-500">
                No work summary data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default HRDashboard;
