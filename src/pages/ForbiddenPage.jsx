import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content flex items-center justify-center px-4">
      <Helmet>
        <title>KachaBazar || Forbidden</title>
      </Helmet>
      <motion.div
        className="text-center max-w-md p-8 bg-base-100 rounded-xl shadow-lg border border-base-300"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-primary text-6xl mb-4 flex justify-center">
          <FiAlertTriangle />
        </div>
        <h1 className="text-4xl font-bold mb-2">403 Forbidden</h1>
        <p className="text-sm mb-6">
          You don’t have permission to access this page.
          <br />
          Please login with the correct role or go back to the homepage.
        </p>
        <Link
          to="/"
          className="btn btn-primary text-white hover:btn-secondary transition-all"
        >
          Go to Homepage
        </Link>
      </motion.div>
    </div>
  );
};

export default ForbiddenPage;
