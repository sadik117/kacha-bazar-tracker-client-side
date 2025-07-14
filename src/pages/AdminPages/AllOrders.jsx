import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../components/hooks/UseAxiosSecure";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";

const AllOrders = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/orders");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading orders...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load orders</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <Helmet>
        <title>Admin Dashboard || All Orders</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">📦 All Orders</h2>
      <table className="table w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Buyer Email</th>
            <th>Product</th>
            <th>Market</th>
            <th>Vendor</th>
            <th>Price</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order.userEmail}</td>
                <td>{order.productInfo.itemName}</td>
                <td>{order.productInfo.marketName}</td>
                <td>{order.productInfo.vendorName}</td>
                <td>৳{order.productInfo.pricePerUnit}</td>
                <td>{format(new Date(order.createdAt), "PPP")}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
