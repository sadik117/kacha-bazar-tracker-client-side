import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAxiosSecure from "../../components/hooks/UseAxiosSecure";
import Loading from "../Loading";
import { Helmet } from "react-helmet-async";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // don't run until email is ready
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Helmet>
        <title>User Dashboard || My Orders</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">🧾 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th>📦 Product</th>
                <th>🏪 Market</th>
                <th>💵 Price</th>
                <th>📅 Date</th>
                <th>🔍</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-100">
                  <td>{order.product.itemName}</td>
                  <td>{order.product.marketName}</td>
                  <td>৳{order.product.pricePerUnit}</td>
                  <td>{order.product.date}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline p-7 md:p-3"
                      onClick={() =>
                        navigate(`/product-details/${order.product._id}`)
                      }
                    >
                      🔍 View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
