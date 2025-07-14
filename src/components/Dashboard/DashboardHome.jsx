import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  FaBoxOpen,
  FaBullhorn,
  FaClipboardList,
  FaUsers,
  FaHeart,
} from "react-icons/fa";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAxiosSecure from "../hooks/UseAxiosSecure";
import useUserRole from "../hooks/useUserRole";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const { role } = useUserRole();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["dashboard-stats", role],
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard-stats?role=${role}`);
      return res.data;
    },
    enabled: !!role,
  });

  const summaryCards = [
    {
      title: "My Products",
      value: stats.products || 0,
      icon: <FaBoxOpen className="text-3xl text-blue-500" />,
      show: role === "vendor",
    },
    {
      title: "My Ads",
      value: stats.ads || 0,
      icon: <FaBullhorn className="text-3xl text-green-500" />,
      show: role === "vendor",
    },
    {
      title: "My Orders",
      value: stats.orders || 0,
      icon: <FaClipboardList className="text-3xl text-purple-500" />,
      show: role === "user",
    },
    {
      title: "My Watchlist",
      value: stats.watchlist || 0,
      icon: <FaHeart className="text-3xl text-rose-500" />,
      show: role === "user",
    },
    {
      title: "All Users",
      value: stats.users || 0,
      icon: <FaUsers className="text-3xl text-orange-500" />,
      show: role === "admin",
    },
    {
      title: "All Products",
      value: stats.allProducts || 0,
      icon: <FaBoxOpen className="text-3xl text-cyan-500" />,
      show: role === "admin",
    },
    {
      title: "All Ads",
      value: stats.allAds || 0,
      icon: <FaBullhorn className="text-3xl text-pink-500" />,
      show: role === "admin",
    },
  ];

  return (
    <motion.div
      className="p-4 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          👋 Welcome back, {user?.displayName || "User"}!
        </h1>
        <p className="text-gray-500 mt-1">Here’s an overview of your dashboard.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaryCards
          .filter((card) => card.show)
          .map((card, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-4 rounded-full">{card.icon}</div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-700">
                    {card.title}
                  </h4>
                  <p className="text-3xl font-bold text-primary">
                    {card.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
};

export default DashboardHome;
