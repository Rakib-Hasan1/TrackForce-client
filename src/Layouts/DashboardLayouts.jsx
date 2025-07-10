import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaBars,
  FaHome,
  FaMoneyCheckAlt,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import logo from "../assets/image (3).jpg";
import useUserRole from "../Hooks/useUserRole";

const DashboardLayouts = () => {
  const { logoutUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role, roleLoading } = useUserRole();

  console.log(role);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 relative">
      {/* Mobile toggle button */}
      <button
        className="md:hidden absolute top-4 left-4 z-50 text-2xl"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="px-6 py-5 text-xl font-semibold border-b border-gray-200 dark:border-gray-700">
          <Link to="/">
            <img
              src={logo}
              className="h-14 w-full rounded-4xl object-cover ml-2 hover:scale-105 transition-transform"
              alt="TrackForce Logo"
            />
          </Link>
        </div>
        <nav className="min-h-[90vh] flex flex-col gap-1 p-4">
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

          {!roleLoading && role === "hr" && (
            <>
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
            </>
          )}

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
