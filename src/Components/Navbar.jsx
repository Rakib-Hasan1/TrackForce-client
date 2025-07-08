import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/image (3).jpg";

const Navbar = () => {
  const links = (
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
    </>
  );

  const logoImg = (
    <>
      <Link to="/">
        <img
          src={logo}
          className="h-10 object-cover rounded-4xl transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
          alt="Logo"
        />
      </Link>
    </>
  );

  return (
    <div className="sticky top-0 z-50 px-3 md:px-8 lg:px-20 navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        {logoImg}
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <Link to='/login'>
          <button className="btn">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
