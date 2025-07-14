import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../components/hooks/UseAxiosSecure";
import { toast } from "react-toastify";
import { useState } from "react";
import { debounce } from "lodash";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced query param update
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = debounce((value) => {
    setSearchQuery(value);
  }, 500); // 500ms delay to avoid frequent calls

  const {
    data: users = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["allUsers", searchQuery],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${searchQuery}`);
      return res.data;
    },
  });

  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) => {
      return await axiosSecure.patch(`/users/${id}/role`, { role });
    },
    onSuccess: () => {
      toast.success("User role updated");
      refetch();
    },
    onError: () => toast.error("Failed to update role"),
  });

  const handleRoleChange = async (id, newRole) => {
    await updateRole({ id, role: newRole });
  };

  return (
    <div className="p-4 overflow-x-auto">
      <Helmet>
        <title>Admin Dashboard || All Users</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">👥 All Users</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by name or email"
        className="input input-bordered w-full max-w-sm mb-4"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearchChange(e.target.value);
        }}
        value={searchTerm}
      />

      <table className="table w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {isFetching ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="space-x-2 space-y-1 md:space-y-0">
                  {["user", "vendor", "admin"].map((roleOption) => (
                    <button
                      key={roleOption}
                      onClick={() => handleRoleChange(user._id, roleOption)}
                      disabled={user.role === roleOption}
                      className={`btn btn-xs ${
                        user.role === roleOption
                          ? "btn-disabled"
                          : "btn-outline"
                      }`}
                    >
                      {roleOption}
                    </button>
                  ))}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
