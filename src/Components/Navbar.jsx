import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import logo2 from "../assets/user.png";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

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

    if (!result.isConfirmed) return;

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

  useEffect(() => {
    localStorage.getItem("theme");
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", theme)
    }
    else {
      localStorage.setItem("theme", theme)
    };

    document.querySelector("html").setAttribute("data-theme", theme);

  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition-colors duration-200 ${isActive ? "text-blue-700 font-semibold" : "text-base-content"
            } hover:text-blue-500`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/faq"
          className={({ isActive }) =>
            `transition-colors duration-200 ${isActive ? "text-blue-700 font-semibold" : "text-base-content"
            } hover:text-blue-500`
          }
        >
          FAQ
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            `transition-colors duration-200 ${isActive ? "text-blue-700 font-semibold" : "text-base-content"
            } hover:text-blue-500`
          }
        >
          Contact Us
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `transition-colors duration-200 ${isActive ? "text-blue-700 font-semibold" : "text-base-content"
                } hover:text-blue-500`
              }
            >
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `transition-colors duration-200 ${isActive ? "text-blue-700 font-semibold" : "text-base-content"
                } hover:text-blue-500`
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
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
          <p className="font-bold text-2xl h-14 text-primary italic hover:scale-105 transition duration-200">Track <hr /> Force</p>
        </Link>

      </div>

      {/* Center (Desktop menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">{navLinks}</ul>
      </div>

      {/* Right: Auth buttons or avatar */}
      <div className="navbar-end space-x-4">
        <label onChange={handleThemeToggle} className="swap swap-rotate w-5">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" className="theme-controller" value="synthwave" />

          {/* sun icon */}
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border border-blue-500">
                <img src={user?.photoURL || logo2} alt="Profile photo" />
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
              <button className="btn btn-ghost text-lg">Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
