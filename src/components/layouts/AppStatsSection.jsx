import { useQuery } from "@tanstack/react-query";
import {
  FaUsers,
  FaStore,
  FaBoxOpen,
  FaBullhorn,
  FaClipboardList,
} from "react-icons/fa";
import useAxios from "../hooks/useAxios";

const AppStatsSection = () => {
  const axios = useAxios();

  const {
    data = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["appStats"],
    queryFn: async () => {
      const res = await axios.get("/stats");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading stats...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load stats: {error.message}
      </p>
    );

  return (
    <section className="max-w-6xl mx-2 md:mx-10 py-10 px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        📊 Platform Statistics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={<FaUsers className="text-blue-600 mx-auto" />}
          label="Users"
          value={data?.totalUsers}
        />
        <StatCard
          icon={<FaStore className="text-green-600 mx-auto" />}
          label="Vendors"
          value={data?.totalVendors}
        />
        <StatCard
          icon={<FaBoxOpen className="text-purple-600 mx-auto" />}
          label="Products"
          value={data?.totalProducts}
        />
        <StatCard
          icon={<FaBullhorn className="text-yellow-600 mx-auto" />}
          label="Advertisements"
          value={data?.totalAds}
        />
        <StatCard
          icon={<FaClipboardList className="text-red-600 mx-auto" />}
          label="Orders"
          value={data?.totalOrders}
        />
      </div>
    </section>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white dark:bg-gray-900 shadow rounded-2xl p-6 text-center hover:shadow-lg transition">
    <div className="text-4xl mb-2">{icon}</div>
    <h4 className="text-3xl font-bold text-gray-800 dark:text-white">
      {value ?? 0}
    </h4>
    <p className="text-gray-500 dark:text-gray-400 text-lg">{label}</p>
  </div>
);

export default AppStatsSection;
