import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const RootLayouts = () => {
  return (
    <div>
      <Navbar></Navbar>
      <section className="min-h-screen">
        <Outlet></Outlet>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default RootLayouts;
