import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";

const Error = () => {
  return (
    <div>
      <Navbar />
      <div className="h-screen flex flex-col items-center justify-center  text-center px-4">
        <motion.h1
          className="text-6xl font-bold text-red-600 mb-4"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-xl mb-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
        >
          <Link
            to="/"
            className="inline-block bg-red-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-red-600 transition"
          >
            Go Back Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Error;
