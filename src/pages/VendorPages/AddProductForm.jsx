import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";

const AddProductForm = ({ onSubmit, defaultValues, isEdit = false }) => {
  const [uploading, setUploading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  // Upload to imgbb
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

  return (
    <motion.div
      className="max-w-4xl mx-auto p-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="card bg-base-100 shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-primary">
          {isEdit ? "Update Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Vendor Info */}
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

          {/* Market Info */}
          <input
            {...register("marketName", { required: "Market Name is required" })}
            className="input input-bordered w-full"
            placeholder="Market Name"
          />
          {errors.marketName && (
            <p className="text-red-500 text-sm">{errors.marketName.message}</p>
          )}

          <textarea
            {...register("marketDescription", {
              required: "Market Description is required",
            })}
            className="textarea textarea-bordered w-full"
            placeholder="Market Description"
          />
          {errors.marketDescription && (
            <p className="text-red-500 text-sm">
              {errors.marketDescription.message}
            </p>
          )}

          {/* Market Date */}
          <div>
            <label className="font-medium mr-2">Market Date</label>
            <DatePicker
              selected={watch("date")}
              onChange={(date) => setValue("date", date)}
              className="input input-bordered w-full"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          {/* Item Info */}
          <input
            {...register("itemName", { required: "Item name is required" })}
            className="input input-bordered w-full"
            placeholder="Item Name (e.g., Onion)"
          />
          {errors.itemName && (
            <p className="text-red-500 text-sm">{errors.itemName.message}</p>
          )}

          <input
            {...register("pricePerUnit", {
              required: "Price per unit is required",
            })}
            type="number"
            className="input input-bordered w-full"
            placeholder="Price per unit (e.g., 30)"
          />
          {errors.pricePerUnit && (
            <p className="text-red-500 text-sm">
              {errors.pricePerUnit.message}
            </p>
          )}

          <textarea
            {...register("itemDescription")}
            className="textarea textarea-bordered w-full"
            placeholder="Item Description (optional)"
          />

          {/* Image Upload */}
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

          {/* Price History */}
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
                  {...register(`prices.${index}.price`, {
                    required: "Price is required",
                  })}
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
            {isEdit ? "Update Product" : "Submit Product"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AddProductForm;
