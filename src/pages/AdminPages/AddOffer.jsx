import { useState } from "react";
import useAxiosSecure from "../../components/hooks/UseAxiosSecure";
import { toast } from "react-toastify";

const AddOffer = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.post("/offers", { title, description });
      toast.success("Offer posted successfully!");
      setTitle("");
      setDescription("");
    } catch {
      toast.error("Failed to post offer");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📢 Post New Offer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="input input-bordered w-full"
          placeholder="Offer Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Offer Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Post Offer
        </button>
      </form>
    </div>
  );
};

export default AddOffer;
