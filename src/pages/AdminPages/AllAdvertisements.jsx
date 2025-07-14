import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../components/hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const AllAdvertisements = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all advertisements
  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["allAdvertisements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/ads/all");
      return res.data;
    },
  });

  // Update ad status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/ads/status/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Ad status updated");
      queryClient.invalidateQueries(["allAdvertisements"]);
    },
    onError: () => toast.error("Failed to update status"),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/ads/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        toast.success("Ad deleted");
        queryClient.invalidateQueries(["allAdvertisements"]);
      } else {
        toast.error("Failed to delete");
      }
    },
    onError: () => toast.error("Error deleting ad"),
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This advertisement will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      deleteMutation.mutate(id);
    }
  };

  const handleStatusChange = async (id, status) => {
    updateStatusMutation.mutate({ id, status });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Helmet>
        <title>Admin Dashboard || All Advertisements</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">📢 All Advertisements</h2>

      {isLoading ? (
        <p>Loading advertisements...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Vendor Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad._id}>
                  <td>{ad.title}</td>
                  <td>{ad.email}</td>
                  <td>
                    <select
                      value={ad.status}
                      onChange={(e) =>
                        handleStatusChange(ad._id, e.target.value)
                      }
                      className="select select-bordered select-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => handleDelete(ad._id)}
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

export default AllAdvertisements;
