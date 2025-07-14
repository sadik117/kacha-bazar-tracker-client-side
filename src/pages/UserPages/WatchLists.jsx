import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAxiosSecure from "../../components/hooks/UseAxiosSecure";
import Loading from "../Loading";
import { Helmet } from "react-helmet-async";

const WatchLists = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    data: watchlist = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["watchlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/watchlist?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/watchlist/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Removed from Watchlist");
      queryClient.invalidateQueries(["watchlist", user.email]);
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this item from watchlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Failed to load watchlist.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Helmet>
        <title>User Dashboard || Watchlist</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6">📋 Manage Watchlist</h2>

      {watchlist.length === 0 ? (
        <p className="text-gray-500">No items in your watchlist.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100">
                <th>#</th>
                <th>Item Name</th>
                <th>Market</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.itemName || "N/A"}</td>
                  <td>{item.marketName || "N/A"}</td>
                  <td>{item.date}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => navigate("/products")}
                      className="btn btn-sm btn-outline"
                    >
                      ➕ Add More
                    </button>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      ❌ Remove
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

export default WatchLists;
