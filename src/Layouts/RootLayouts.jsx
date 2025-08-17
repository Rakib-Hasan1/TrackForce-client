import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SplashCursor from "../../reactbits/SplashCursor/SplashCursor"

const RootLayouts = () => {
  return (
    <div>
      <SplashCursor/>
      <Navbar></Navbar>
      <section className="min-h-screen">
        <Outlet></Outlet>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default RootLayouts;
