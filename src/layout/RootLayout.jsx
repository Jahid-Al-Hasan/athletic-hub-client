import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="bg-background">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
