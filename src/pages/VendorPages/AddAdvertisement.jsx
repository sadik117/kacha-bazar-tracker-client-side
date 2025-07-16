import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useMemo, useState, useContext } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAxiosSecure from "../../components/hooks/UseAxiosSecure";

const AddAdvertisement = ({ onClose, refetch, defaultValues = {}, isEdit = false }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
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

  // Memoize default form values to prevent infinite loops
  const memoizedDefaults = useMemo(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      return {
        title: defaultValues.title || "",
        description: defaultValues.description || "",
        image: defaultValues.image || "",
        status: defaultValues.status || "pending",
        email: defaultValues.email || user?.email || "",
      };
    } else {
      return {
        title: "",
        description: "",
        image: "",
        status: "pending",
        email: user?.email || "",
      };
    }
  }, [defaultValues, user]);

  useEffect(() => {
  if (isEdit && defaultValues && Object.keys(defaultValues).length > 0) {
    reset({
      title: defaultValues.title || "",
      description: defaultValues.description || "",
      image: defaultValues.image || "",
      status: defaultValues.status || "pending",
      email: defaultValues.email || user?.email || "",
    });
  }
}, [isEdit, defaultValues?._id, reset]);


  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );
      const url = res.data?.data?.url;
      if (url) {
        setValue("image", url);
        toast.success("Image uploaded successfully");
      }
      return url;
    } catch (error) {
      console.error(error);
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
          email: user?.email,
          status: "pending",
        });
        if (res.data.insertedId) {
          toast.success("Advertisement created");
          reset();
          refetch?.();
          onClose?.();
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving");
    }
  };

  const imageUrl = watch("image");

  return (
    <>
      <Helmet>
        <title>{isEdit ? "Edit Advertisement" : "Add Advertisement"} | Vendor Dashboard</title>
      </Helmet>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-xl mx-auto">
        {/* Vendor Email */}
        <div>
          <label className="label">Vendor Email</label>
          <input
            {...register("email")}
            readOnly
            className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Title */}
        <div>
          <label className="label">Ad Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Enter ad title"
            className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Enter description"
            className="textarea textarea-bordered w-full dark:bg-gray-800 dark:text-white"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="label">Upload Image</label>
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
          {uploading && <p className="text-yellow-500 text-sm mt-1">Uploading image...</p>}
        </div>

        {/* Image Preview */}
        {imageUrl && (
          <div className="mt-4">
            <img
              src={imageUrl}
              alt="Ad Preview"
              className="rounded-lg w-full max-h-[300px] object-contain border shadow"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={uploading}
        >
          {isEdit ? "Update Advertisement" : "Create Advertisement"}
        </button>
      </form>
    </>
  );
};

export default AddAdvertisement;
