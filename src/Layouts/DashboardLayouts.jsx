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
  FaChartLine,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import site_logo from "../assets/site_logo.png";
import useUserRole from "../Hooks/useUserRole";
import LoadingEffect from "../Components/LoadingEffect";
import { FaMoneyCheckDollar } from "react-icons/fa6";

const DashboardLayouts = () => {
  const { logoutUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role, roleLoading } = useUserRole();


  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
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
    }
  };
  if (roleLoading) {
    return <LoadingEffect></LoadingEffect>;
  }

  return (
    <div className="min-h-screen flex bg-base-100 relative">
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded md:hidden"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`z-40 h-screen w-64 bg-base-100 shadow-lg transition-transform duration-300
            ${isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
          }
           fixed md:sticky top-0`}
      >
        <div className="px-6 py-5 text-xl font-semibold border-b border-gray-200">
          <Link to="/">
            <p className="font-bold text-center text-3xl h-10 text-primary italic hover:scale-105 transition duration-200">Track Force</p>
          </Link>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-blue-400 ${isActive ? "bg-blue-400 font-semibold" : ""
              }`
            }
          >
            <FaHome />
            Home
          </NavLink>

          {!roleLoading && role === "employee" && (
            <>
              <NavLink
                to="/dashboard/work-sheet"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-blue-400 ${isActive ? "bg-blue-400 font-semibold" : ""
                  }`
                }
              >
                <FaClipboardList />
                Work Sheet
              </NavLink>

              <NavLink
                to="/dashboard/payment-history"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-blue-400 ${isActive ? "bg-blue-400 font-semibold" : ""
                  }`
                }
              >
                <FaMoneyCheckAlt />
                Payment History
              </NavLink>
            </>
          )}

          {!roleLoading && role === "hr" && (
            <>
              <NavLink
                to="/dashboard/employee-list"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-blue-400 ${isActive ? "bg-blue-400 font-semibold" : ""
                  }`
                }
              >
                <FaUsers />
                Employee List
              </NavLink>
              <NavLink
                to="/dashboard/progress"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-blue-400 ${isActive ? "bg-blue-400 font-semibold" : ""
                  }`
                }
              >
                <FaChartLine />
                Progress
              </NavLink>
            </>
          )}
          {!roleLoading && role === "admin" && (
            <>
              <NavLink
                to="/dashboard/all-employee"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-blue-400 ${isActive ? "bg-blue-400 font-semibold" : ""
                  }`
                }
              >
                <FaUsers />
                All Employee List
              </NavLink>
              <NavLink
                to="/dashboard/payroll"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-blue-400 ${isActive ? "bg-blue-400 font-semibold" : ""
                  }`
                }
              >
                <FaMoneyCheckDollar />
                Payroll
              </NavLink>
            </>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 mt-4 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition cursor-pointer"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-11/12 mx-auto mt-10 md:pt-0 p-4 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayouts;
