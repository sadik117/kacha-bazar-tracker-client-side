import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../components/hooks/UseAxiosSecure";
import { toast } from "react-toastify";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
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
      <h2 className="text-2xl font-bold mb-4">👥 All Users</h2>
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
          {users.map((user) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
