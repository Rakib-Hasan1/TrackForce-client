import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingEffect from "../../Components/LoadingEffect";


const EmployeeDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: person, isLoading } = useQuery({
    queryKey: ["person", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/peoples/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingEffect />;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <img
        src={person.photo || "https://via.placeholder.com/120"}
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
      />
      <h2 className="text-2xl font-semibold text-center mb-2">{person.name}</h2>
      <p className="text-center text-gray-600 mb-1">{person.role}</p>
      <p className="text-center text-gray-600">{person.designation}</p>
      <div className="text-center mt-4">
        {person.isVerified ? (
          <span className="text-green-500 font-semibold">✅ Verified</span>
        ) : (
          <span className="text-red-500 font-semibold">❌ Not Verified</span>
        )}
      </div>

      {/* Add stats/chart here if needed */}
      
    </div>
  );
};

export default EmployeeDetails;
