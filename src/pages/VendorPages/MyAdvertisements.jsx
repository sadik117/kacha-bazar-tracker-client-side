import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../components/hooks/UseAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import AddAdvertisement from "./AddAdvertisement";
import { toast } from "react-toastify";

const MyAdvertisements = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [editingAd, setEditingAd] = useState(null);

  const { data: ads = [], refetch } = useQuery({
    queryKey: ["myAds", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/ads?vendor=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this advertisement?")) {
      const res = await axiosSecure.delete(`/ads/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Ad deleted");
        refetch();
      } else {
        toast.error("Failed to delete");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Advertisements</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id}>
                <td>{ad.title}</td>
                <td>{ad.description}</td>
                <td>{ad.status}</td>
                <td className="space-x-2">
                  <button className="btn btn-sm btn-outline" onClick={() => setEditingAd(ad)}>Edit</button>
                  <button className="btn btn-sm btn-error" onClick={() => handleDelete(ad._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingAd && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 max-w-xl w-full relative">
            <button className="absolute right-2 top-2 text-xl" onClick={() => setEditingAd(null)}>✕</button>
            <AddAdvertisement defaultValues={editingAd} isEdit onClose={() => setEditingAd(null)} refetch={refetch} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAdvertisements;
