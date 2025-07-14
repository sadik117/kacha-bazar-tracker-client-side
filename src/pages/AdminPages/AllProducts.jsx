import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../components/hooks/UseAxiosSecure";
import { toast } from "react-toastify";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import RejectionModal from "./RejectionModal";
import { Helmet } from "react-helmet-async";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  const { data: products = [], refetch } = useQuery({
    queryKey: ["adminAllProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/products");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    const res = await axiosSecure.patch(`/admin/products/${id}`, {
      status: "approved",
    });
    if (res.data.modifiedCount) {
      toast.success("Product approved");
      refetch();
    }
  };

  const handleReject = (product) => {
    setSelectedProduct(product);
    setShowRejectionModal(true);
  };

  const confirmReject = async (reason) => {
    const res = await axiosSecure.patch(
      `/admin/products/${selectedProduct._id}`,
      {
        status: "rejected",
        rejectionReason: reason,
      }
    );
    if (res.data.modifiedCount) {
      toast.warn("Product rejected");
      refetch();
      setShowRejectionModal(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/admin/products/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Product deleted");
        refetch();
      }
    }
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>Admin Dashboard || All Products</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">📋 All Products</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Market</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.itemName}</td>
                <td>{p.marketName}</td>
                <td>
                  <span
                    className={`badge badge-${
                      p.status === "approved"
                        ? "success"
                        : p.status === "pending"
                        ? "warning"
                        : "error"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td>{p.rejectionReason || "-"}</td>
                <td className="space-x-2 space-y-1 grid md:grid-cols-2">
                  {p.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(p._id)}
                        className="btn btn-xs btn-success"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(p)}
                        className="btn btn-xs btn-error"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <Link
                    to={`/dashboard/update-product/${p._id}`}
                    className="btn btn-xs btn-info"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="btn btn-xs btn-outline btn-error w-15 md:w-26"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rejection Modal */}
      {showRejectionModal && (
        <RejectionModal
          onClose={() => setShowRejectionModal(false)}
          onSubmit={confirmReject}
        />
      )}
    </div>
  );
};

export default AllProducts;
