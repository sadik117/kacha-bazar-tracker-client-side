// src/pages/VendorPages/UpdateProduct.jsx
import React, { useEffect, useState, useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../../components/hooks/UseAxiosSecure";
import { AuthContext } from "../../Authentication/AuthProvider";
import { motion } from "framer-motion";
import axios from "axios";
import useUserRole from "../../components/hooks/useUserRole";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);
  const { role } = useUserRole();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      vendorName: "",
      marketName: "",
      date: new Date(),
      marketDescription: "",
      itemName: "",
      pricePerUnit: "",
      status: "",
      image: "",
      itemDescription: "",
      prices: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosSecure.get(`/products/${id}`);
        const product = res.data;

        reset({
          ...product,
          date: new Date(product.date),
          prices: product.prices.map((p) => ({
            date: new Date(p.date),
            price: p.price,
          })),
        });
      } catch (err) {
        toast.error("Failed to fetch product details");
      }
    };

    fetchProduct();
  }, [id, axiosSecure, reset]);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      setUploading(true);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      setUploading(false);
      return res.data.data.url;
    } catch (err) {
      setUploading(false);
      toast.error("Image upload failed");
      return null;
    }
  };

  const onSubmit = async (data) => {
    try {
      data.date = data.date.toISOString().split("T")[0];
      data.prices = data.prices.map((p) => ({
        date: p.date.toISOString().split("T")[0],
        price: Number(p.price),
      }));
      data.pricePerUnit = Number(data.pricePerUnit);

      const res = await axiosSecure.put(`/products/${id}`, data);

      if (res.data.modifiedCount > 0) {
        toast.success("Product updated successfully!");
        if (role === "admin") {
          navigate("/dashboard/all-products");
        } else {
          navigate("/dashboard/my-products");
        }
      } else {
        toast.error("No changes were made.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating!");
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="card bg-base-100 shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-primary">Update Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              {...register("email")}
              readOnly
              className="input input-bordered w-full"
            />
            <input
              {...register("vendorName")}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <input
            {...register("marketName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Market Name"
          />
          <textarea
            {...register("marketDescription", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Market Description"
          />

          <div>
            <label className="font-medium mr-2">Market Date</label>
            <DatePicker
              selected={watch("date")}
              onChange={(date) => setValue("date", date)}
              className="input input-bordered w-full"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          <input
            {...register("itemName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Item Name"
          />
          <input
            {...register("pricePerUnit", { required: true })}
            type="number"
            className="input input-bordered w-full"
            placeholder="Price per unit"
          />
          <textarea
            {...register("itemDescription")}
            className="textarea textarea-bordered w-full"
            placeholder="Item Description"
          />

          <div>
            <label className="font-medium">Upload Product Image</label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              accept="image/*"
              onChange={async (e) => {
                const url = await uploadImage(e.target.files[0]);
                if (url) setValue("image", url);
              }}
            />
            {uploading && (
              <p className="text-sm text-warning mt-1">Uploading image...</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Price History</h3>
            {fields.map((field, index) => (
              <div key={field.id} className="grid md:grid-cols-3 gap-2 mb-2">
                <DatePicker
                  selected={watch(`prices.${index}.date`)}
                  onChange={(date) => setValue(`prices.${index}.date`, date)}
                  className="input input-bordered w-full"
                  dateFormat="yyyy-MM-dd"
                />
                <input
                  {...register(`prices.${index}.price`, { required: true })}
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="৳ Price"
                />
                <button
                  type="button"
                  className="btn btn-sm btn-error"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={() => append({ date: new Date(), price: "" })}
            >
              ➕ Add More Entry
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full text-white mt-4"
            disabled={uploading}
          >
            Update Product
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default UpdateProduct;
