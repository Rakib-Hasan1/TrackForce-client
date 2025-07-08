import { Link, NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaMoneyCheckAlt,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import logo from "../assets/image (3).jpg";

const DashboardLayouts = () => {
  const { logoutUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      Swal.fire({
        icon: "success",
        title: "Logged out successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Logout error:", error);
      Swal.fire("Logout Failed", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 hidden md:flex flex-col bg-white dark:bg-gray-800 shadow-lg">
        <div className="px-6 py-5 text-xl font-semibold border-b border-gray-200 dark:border-gray-700">
          <Link to="/">
            <img
              src={logo}
              className="h-10 rounded-4xl object-cover ml-2 hover:scale-105 transition-transform"
              alt="TrackForce Logo"
            />
          </Link>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-blue-100 dark:hover:bg-gray-700 ${
                isActive ? "bg-blue-200 dark:bg-gray-700 font-semibold" : ""
              }`
            }
          >
            <FaHome />
            Dashboard Home
          </NavLink>

          <NavLink
            to="/dashboard/work-sheet"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-blue-100 dark:hover:bg-gray-700 ${
                isActive ? "bg-blue-200 dark:bg-gray-700 font-semibold" : ""
              }`
            }
          >
            <FaClipboardList />
            Work Sheet
          </NavLink>

          <NavLink
            to="/dashboard/payment-history"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-blue-100 dark:hover:bg-gray-700 ${
                isActive ? "bg-blue-200 dark:bg-gray-700 font-semibold" : ""
              }`
            }
          >
            <FaMoneyCheckAlt />
            Payment History
          </NavLink>

          <NavLink
            to="/dashboard/employee-list"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-blue-100 dark:hover:bg-gray-700 ${
                isActive ? "bg-blue-200 dark:bg-gray-700 font-semibold" : ""
              }`
            }
          >
            <FaUsers />
            Employee List
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 mt-4 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-11/12 mx-auto p-4 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayouts;
