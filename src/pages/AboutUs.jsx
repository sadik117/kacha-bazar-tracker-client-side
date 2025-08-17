import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen py-12 px-6">
      <Helmet>
        <title>About Us || কাঁচাবাজার</title>
      </Helmet>

      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🛒 About কাঁচাবাজার
        </motion.h2>

        <p className="text-gray-600 dark:text-gray-400 text-lg mb-10">
          Your go-to digital marketplace for tracking real-time prices of fresh produce across local markets in Bangladesh.
        </p>

        <motion.div
          className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-left shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold mb-4">📌 Our Mission</h3>
          <p className="mb-4">
            কাঁচাবাজার is built to empower consumers, vendors, and admins with accurate pricing and data analytics to make smarter buying, selling, and management decisions.
          </p>
          <p className="mb-4">
            We aim to bring transparency and convenience to the traditional market system by enabling:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>✅ Real-time product price tracking from multiple local markets</li>
            <li>✅ Role-based dashboards for Admins, Vendors, and Users</li>
            <li>✅ Secure Watchlist & Online Ordering with Stripe</li>
            <li>✅ Data visualization for price trends and analysis</li>
            <li>✅ Community reviews and product feedback</li>
          </ul>
        </motion.div>

        <motion.div
          className="mt-10 bg-yellow-50 dark:bg-gray-800 rounded-lg p-6 text-left shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold mb-4">👨‍💻 Built With ❤️</h3>
          <p className="mb-2">This platform was crafted using modern technologies:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>⚛️ React, Tailwind CSS, Framer Motion</li>
            <li>🔒 JWT Auth, Firebase, Stripe</li>
            <li>🚀 Express.js, MongoDB, TanStack Query</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
