import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingEffect from "../../../Components/LoadingEffect";

const HRDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ["workSummary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/works/summary");
      return res.data;
    },
  });

  if (isLoading) return <LoadingEffect />;
  if (error) return <div className="text-error">Error loading work summary.</div>;

  return (
    <section className="p-4 bg-base-200 rounded-md">
      <h2 className="text-3xl font-bold mb-4 text-blue-500 mozilla">
        Employee's Work Summary
      </h2>
      <table className="table table-zebra w-full border border-base-300">
        <thead>
          <tr>
            <th className="p-2 text-base-content">Employee Email</th>
            <th className="p-2 text-base-content">Total Hours</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length ? (
            data.map(({ email, totalHours }) => (
              <tr
                key={email}
                className="hover:bg-base-300 text-base-content"
              >
                <td className="p-2">{email}</td>
                <td className="p-2">{totalHours}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="p-2 text-center text-base-content/70">
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
