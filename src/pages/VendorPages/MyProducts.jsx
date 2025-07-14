import React, { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../../components/hooks/UseAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["vendorProducts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?vendor=${user.email}`);
      return res.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/products/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        toast.success("Product deleted");
        queryClient.invalidateQueries(["vendorProducts"]);
      } else {
        toast.error("Failed to delete");
      }
    },
    onError: () => {
      toast.error("Error deleting product");
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Helmet>
        <title>Vendor Dashboard || My Products</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">📦 My Products</h2>

      {isLoading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price/Unit</th>
                <th>Market</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.itemName}</td>
                  <td>৳{p.pricePerUnit}</td>
                  <td>{p.marketName}</td>
                  <td>{p.date}</td>
                  <td>
                    <span className="capitalize">{p.status}</span>
                    {p.status === "rejected" && p.rejectionReason && (
                      <div className="text-xs text-red-500 mt-1 italic">
                        Reason: {p.rejectionReason}
                      </div>
                    )}
                  </td>
                  <td className="space-x-2">
                    <Link
                      to={`/dashboard/update-product/${p._id}`}
                      className="btn btn-sm btn-info text-white mb-1 md:mb-0"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Delete
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

export default MyProducts;
