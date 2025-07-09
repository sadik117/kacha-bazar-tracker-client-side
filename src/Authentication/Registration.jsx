import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import registerAnimation from "../assets/registration.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import SocialLogin from "./SocialLogin";
import useAxiosSecure from "../components/hooks/UseAxiosSecure";

export default function Registration() {
  const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); 
  const [uploading, setUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;
    return hasUpper && hasLower && isLongEnough;
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formDataImg = new FormData();
    formDataImg.append("image", image);
    setUploading(true);
    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formDataImg,
        }
      );
      const data = await res.json();
      if (data.success) {
        setPhotoURL(data.data.url);
        toast.success("Photo uploaded!");
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      toast.error("Upload error");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!validatePassword(data.password)) {
      setError("password", {
        type: "manual",
        message:
          "Password must contain uppercase, lowercase & be at least 6 characters.",
      });
      return;
    }

    if (!photoURL) {
      toast.error("Please upload a profile picture before registering.");
      return;
    }

    try {
      //  Register user with Firebase
      const result = await createUser(data.email, data.password);

      //  Update Firebase user profile
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      //  Prepare user info for backend
      const userInfo = {
        email: data.email,
        name: data.name,
        photoURL,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      //  Send user info to backend & get JWT token
      const response = await axiosSecure.post("/users", userInfo);

      //  Save JWT token to localStorage
      const token = response.data.token;
      if (token) {
        localStorage.setItem("access-token", token);
      } else {
        toast.error("Failed to receive token");
        return;
      }

      //  Set user in context
      setUser({
        ...result.user,
        displayName: data.name,
        photoURL,
      });

      toast.success("Registration successful!");
      navigate(location.state?.from || "/");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen mx-2 md:mx-10 mt-5 md:mt-10 py-20 bg-gradient-to-br from-[#102a0f] to-[#1a382b] flex items-center justify-center px-4">
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-4xl border border-white/20 flex flex-col md:flex-row gap-6 items-center"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <div className="w-full md:w-1/2">
          <Lottie animationData={registerAnimation} loop={true} />
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-white text-3xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Name */}
            <div>
              <label className="block text-white mb-1">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`w-full px-4 py-2 rounded-md bg-white/10 border ${
                  errors.name ? "border-red-500" : "border-white/20"
                } text-white`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-white mb-1">Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white file:text-white file:bg-teal-600 file:border-none file:px-4 file:py-1.5 file:rounded hover:file:bg-teal-700"
              />
              {uploading && (
                <p className="text-yellow-300 text-sm mt-1">Uploading...</p>
              )}
              {photoURL && (
                <img
                  src={photoURL}
                  alt="Preview"
                  className="mt-2 w-14 h-14 rounded-full ring ring-primary object-cover"
                />
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-white mb-1">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-4 py-2 rounded-md bg-white/10 border ${
                  errors.email ? "border-red-500" : "border-white/20"
                } text-white`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-white mb-1">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className={`w-full px-4 py-2 rounded-md bg-white/10 border ${
                  errors.password ? "border-red-500" : "border-white/20"
                } text-white`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 transition px-4 py-2 rounded-md text-white font-semibold"
              disabled={uploading}
            >
              Register
            </motion.button>
          </form>

          {/* Social Login */}
          <SocialLogin />

          {/* Link to login */}
          <p className="text-center text-sm text-white/70 mt-4">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-green-400 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
