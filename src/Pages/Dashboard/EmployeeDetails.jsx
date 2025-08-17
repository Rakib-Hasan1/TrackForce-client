import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingEffect from "../../Components/LoadingEffect";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const EmployeeDetails = () => {
  const { id } = useParams(); // `id` = employee MongoDB _id
  const axiosSecure = useAxiosSecure();

  const { data: person, isLoading } = useQuery({
    queryKey: ["person", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/peoples/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingEffect />;

  const chartData = person.salaryHistory?.map((entry) => ({
    name: `${entry.month}-${entry.year}`,
    salary: entry.salary,
  }));

  return (
    <div className="mt-10 p-6 bg-base-100 dark:bg-base-200 shadow-md rounded-lg">
      <div className="flex flex-col items-center">
        <img
          src={person.photo || "https://via.placeholder.com/120"}
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4 object-cover"
        />
        <h2 className="text-2xl font-semibold text-center mb-1 text-base-content dark:text-base-100">
          {person.name}
        </h2>
        <p className="text-base-content dark:text-base-200 text-center mb-1">
          {person.role}
        </p>
        <p className="text-base-content dark:text-base-200 text-center">
          {person.designation}
        </p>
        <div className="mt-2 text-center">
          {person.isVerified ? (
            <span className="text-success font-medium">✅ Verified</span>
          ) : (
            <span className="text-error font-medium">❌ Not Verified</span>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4 text-center text-base-content dark:text-base-100">
          Salary Payment History
        </h3>
        {chartData?.length ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="salary" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No salary records found.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
