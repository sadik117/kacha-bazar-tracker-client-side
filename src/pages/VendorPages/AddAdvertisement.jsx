import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../components/hooks/UseAxiosSecure";
import axios from "axios";
import { AuthContext } from "../../Authentication/AuthProvider";
import { Helmet } from "react-helmet-async";

const AddAdvertisement = ({
  onClose,
  refetch,
  defaultValues = {},
  isEdit = false,
}) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
      status: "pending",
      email: user?.email || "",
    },
  });

  // Reset form values when defaultValues change
  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset({
        title: defaultValues.title || "",
        description: defaultValues.description || "",
        image: defaultValues.image || "",
        status: defaultValues.status || "pending",
        email: defaultValues.email || user?.email || "",
      });
    } else {
      reset({
        email: user?.email || "",
        status: "pending",
      });
    }
  }, [defaultValues, reset, user]);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      const url = res.data?.data?.url;
      if (url) {
        setValue("image", url);
        toast.success("Image uploaded");
      }
      return url;
    } catch {
      toast.error("Image upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        const res = await axiosSecure.patch(`/ads/${defaultValues._id}`, data);
        if (res.data.modifiedCount) {
          toast.success("Advertisement updated");
          refetch?.();
          onClose?.();
        } else {
          toast.info("No changes made");
        }
      } else {
        const res = await axiosSecure.post("/ads", {
          ...data,
          email: user.email,
          status: "pending",
        });
        if (res.data.insertedId) {
          toast.success("Advertisement created");
          reset();
          refetch?.();
          onClose?.();
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving advertisement");
    }
  };

  return (
    <>
      <Helmet>
        <title>Vendor Dashboard || Add Advertisement</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-4">
        {/* Vendor Email */}
        <input
          {...register("email")}
          readOnly
          value={user?.email || ""}
          className="input input-bordered w-full"
          placeholder="Vendor Email"
        />

        {/* Title */}
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Ad Title"
          className="input input-bordered w-full"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        {/* Description */}
        <textarea
          {...register("description", { required: "Description is required" })}
          placeholder="Short Description"
          className="textarea textarea-bordered w-full"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            if (e.target.files.length > 0) {
              await uploadImage(e.target.files[0]);
            }
          }}
          className="file-input file-input-bordered w-full"
        />
        {uploading && (
          <p className="text-yellow-500 text-sm">Uploading image...</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-2"
          disabled={uploading}
        >
          {isEdit ? "Update Advertisement" : "Create Advertisement"}
        </button>
      </form>
    </>
  );
};

export default AddAdvertisement;
