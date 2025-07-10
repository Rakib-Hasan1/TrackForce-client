import { Link } from "react-router";
import { ShieldX } from "lucide-react";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="max-w-md text-center bg-white shadow-lg p-10 rounded-xl">
        <ShieldX size={50} className="text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-red-600 mb-2">403 - Forbidden</h1>
        <p className="text-gray-700 mb-6">
          You don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
