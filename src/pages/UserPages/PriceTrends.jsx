import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAxiosSecure from "../../components/hooks/UseAxiosSecure";
import Loading from "../Loading";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";

const PriceTrends = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch user's watchlist
  const { data: watchlist = [], isLoading: isLoadingWatchlist } = useQuery({
    queryKey: ["watchlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/watchlist?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch price history of selected item
  const { data: priceHistory = [], isLoading: isLoadingHistory } = useQuery({
    queryKey: ["priceHistory", selectedItem?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products/${selectedItem.productId}/history`
      );
      return res.data;
    },
    enabled: !!selectedItem?.productId,
  });

  const getTrend = () => {
    if (priceHistory.length < 2) return null;
    const prices = [...priceHistory];
    const first = prices[0].price;
    const last = prices[prices.length - 1].price;
    const diff = last - first;
    const percent = ((diff / first) * 100).toFixed(1);
    const trend = diff >= 0 ? `+${percent}%` : `${percent}%`;
    return (
      <span className={diff >= 0 ? "text-green-600" : "text-red-500"}>
        {trend} last 7 days
      </span>
    );
  };

  if (isLoadingWatchlist) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Helmet>
        <title>User Dashboard || Price Trends</title>
      </Helmet>
      {/* Left: Item List */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-bold text-lg mb-4">Tracked Items</h3>
        <ul className="space-y-2">
          {watchlist.map((item) => (
            <li
              key={item._id}
              onClick={() => setSelectedItem(item)}
              className={`cursor-pointer p-2 rounded ${
                selectedItem?._id === item._id
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <span role="img"></span> {item.itemName}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Chart */}
      <div className="md:col-span-2 bg-white rounded shadow p-4">
        {selectedItem ? (
          <>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-1">
              {selectedItem.itemName}
            </h2>
            <p>🏪 Market: {selectedItem.marketName}</p>
            <p>👤 Vendor: {selectedItem.vendorName}</p>
            <p>📅 Last updated: {selectedItem.date}</p>

            <div className="mt-4">
              {isLoadingHistory ? (
                <Loading />
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(d) => format(new Date(d), "MMM d")}
                      />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(d) => format(new Date(d), "PPP")}
                      />
                      <Line type="monotone" dataKey="price" stroke="#3B82F6" />
                    </LineChart>
                  </ResponsiveContainer>
                  <p className="mt-2 font-medium">Trend: {getTrend()}</p>
                </>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center mt-20">
            Select an item to view its price trend.
          </p>
        )}
      </div>
    </div>
  );
};

export default PriceTrends;
