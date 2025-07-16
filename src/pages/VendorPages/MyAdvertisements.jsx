import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../components/hooks/UseAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import AddAdvertisement from "./AddAdvertisement";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyAdvertisements = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [editingAd, setEditingAd] = useState(null);

  const {
    data: ads = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myAds", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/ads/vendor`);
      return res.data;
    },
    enabled: !!user?.email,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This advertisement will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/ads/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success("Ad deleted successfully");
          refetch();
        } else {
          toast.error("Failed to delete ad");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred");
      }
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Helmet>
        <title>Vendor Dashboard || My Advertisements</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-center">
        📢 My Advertisements
      </h2>

      {isLoading && (
        <div className="text-center py-10 text-lg font-semibold">
          Loading advertisements...
        </div>
      )}

      {isError && (
        <div className="text-center text-red-500 font-semibold">
          Failed to load advertisements.
        </div>
      )}

      {!isLoading && ads.length > 0 ? (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="table w-full text-sm">
            <thead className="bg-primary text-white text-base">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad._id} className="hover:bg-gray-100 transition">
                  <td className="p-3 font-semibold">{ad.title}</td>
                  <td className="p-3">{ad.description}</td>
                  <td className="p-3">
                    <span
                      className={`badge ${
                        ad.status === "approved"
                          ? "badge-success"
                          : ad.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {ad.status}
                    </span>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      className="btn btn-sm btn-outline btn-primary p-2 mb-1"
                      onClick={() => setEditingAd(ad)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error p-2"
                      onClick={() => handleDelete(ad._id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-6 text-gray-500">
            No advertisements found.
          </div>
        )
      )}

      {/* Edit Modal */}
      {editingAd && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4 sm:p-6">
          <div className="bg-white rounded p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute right-2 top-2 text-xl"
              onClick={() => setEditingAd(null)}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-3">Update Advertisement</h3>
            <AddAdvertisement
              defaultValues={editingAd}
              isEdit
              onClose={() => setEditingAd(null)}
              refetch={refetch}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAdvertisements;
