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
    <section className="p-4 bg-base-100 dark:bg-base-200 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-base-content dark:text-base-100">
        Employee's Work Summary
      </h2>
      <table className="table table-zebra w-full border border-base-300">
        <thead className="bg-base-200 dark:bg-base-300">
          <tr>
            <th className="p-2 text-base-content dark:text-base-100">Employee Email</th>
            <th className="p-2 text-base-content dark:text-base-100">Total Hours</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length ? (
            data.map(({ email, totalHours }) => (
              <tr
                key={email}
                className="hover:bg-base-300 dark:hover:bg-base-400 text-base-content dark:text-base-100"
              >
                <td className="p-2">{email}</td>
                <td className="p-2">{totalHours}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="p-2 text-center text-base-content/70 dark:text-base-200">
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
