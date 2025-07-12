import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/image (3).jpg";
// import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import logo2 from "../assets/user.png";

const Navbar = () => {
  const { user, logoutUser } = useAuth();

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


  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition-colors duration-200 ${
              isActive ? "text-blue-700 font-semibold" : "text-gray-700"
            } hover:text-blue-500`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            `transition-colors duration-200 ${
              isActive ? "text-blue-700 font-semibold" : "text-gray-700"
            } hover:text-blue-500`
          }
        >
          Contact Us
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `transition-colors duration-200 ${
                isActive ? "text-blue-700 font-semibold" : "text-gray-700"
              } hover:text-blue-500`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 navbar bg-base-100 shadow-sm px-4 lg:px-20">
      {/* Left: Mobile dropdown + logo */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="h-10 rounded-4xl object-cover ml-2 hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      {/* Center (Desktop menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* Right: Auth buttons or avatar */}
      <div className="navbar-end space-x-3">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border border-blue-500">
                <img src={user? user?.photoURL : logo2} alt="User Avatar" />
              </div>
            </div>

            {/* Dropdown Content */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
            >
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 font-medium"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-sm">Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
