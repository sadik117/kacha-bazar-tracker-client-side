import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import registerAnimation from "../assets/registration.json";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Authentication/AuthProvider";

export default function Registration() {
  const { createUser, setUser, updateUserProfile, googleSignIn } =
    useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;
    return hasUpper && hasLower && isLongEnough;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formDataImg = new FormData();
    formDataImg.append("image", image);
    setUploading(true);
    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`,
        {
          method: "POST",
          body: formDataImg,
        }
      );
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, photoURL: data.data.url }));
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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must contain uppercase, lowercase & be at least 6 characters."
      );
      return;
    }

    try {
      const userCredential = await createUser(
        formData.email,
        formData.password
      );

      await updateUserProfile({
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      setUser({
        ...userCredential.user,
        displayName: formData.name,
        photoURL: formData.photoURL,
      });
      toast.success("Registration successful!");
      navigate(location.state?.from || "/");
    } catch (error) {
      toast.error("Registration failed: " + error.message);
    }
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        setUser(result.user);
        toast.success("Google Sign-Up successful!");
        navigate(location.state?.from || "/");
      })
      .catch(() => {
        toast.error("Google Sign-Up failed!");
      });
  };

  return (
    <div className="min-h-screen mx-2 md:mx-10 mt-5 md:mt-10 py-20 bg-gradient-to-br from-[#102a0f] to-[#1a382b] flex items-center justify-center px-4">
      {/* <Helmet>
        <title>Registration || কাঁচাবাজার</title>
      </Helmet> */}

      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-4xl border border-white/20 flex flex-col md:flex-row gap-6 items-center"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        {/* Lottie Animation */}
        <div className="w-full md:w-1/2">
          <Lottie animationData={registerAnimation} loop={true} />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-white text-3xl font-bold text-center mb-6">
            Register
          </h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-white mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Profile Photo Upload */}
            <div>
              <label className="block text-white mb-1">Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white file:text-white file:bg-teal-600 file:border-none file:px-4 file:py-1.5 file:rounded hover:file:bg-teal-700"
              />
              {uploading && <p className="text-yellow-300 text-sm mt-1">Uploading...</p>}
              {formData.photoURL && (
                <img
                  src={formData.photoURL}
                  alt="Preview"
                  className="mt-2 w-14 h-14 rounded-full ring ring-primary object-cover"
                />
              )}
            </div>

            <div>
              <label className="block text-white mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-white mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 transition px-4 py-2 rounded-md text-white font-semibold"
            >
              Register
            </motion.button>
          </form>

          {/* Google Sign In */}
          <motion.button
            onClick={handleGoogleSignIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center gap-3 px-4 py-2 mt-4 border border-white/30 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium transition"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 488 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#ffffff"
                d="M488 261.8c0-17.8-1.5-35-4.3-51.7H249v97.9h135.4c-5.9 32-23.9 59-51 77.1v63.9h82.4c48.3-44.5 76.2-110.1 76.2-187.2z"
              />
              <path
                fill="#ffffff"
                d="M249 492c69.6 0 128-22.9 170.6-62.3l-82.4-63.9c-23 15.4-52.5 24.4-88.2 24.4-67.8 0-125.3-45.8-145.9-107.5H19v67.7C61.5 431.3 148.4 492 249 492z"
              />
              <path
                fill="#ffffff"
                d="M103.1 282.7c-4.8-14.4-7.6-29.7-7.6-45.4s2.7-31 7.6-45.4V124.2H19C6.6 149.2 0 177.1 0 206.3s6.6 57.1 19 82.1l84.1-65.7z"
              />
              <path
                fill="#ffffff"
                d="M249 97.5c37.8 0 71.6 13 98.2 38.5l73.6-73.6C377 25.1 318.6 0 249 0 148.4 0 61.5 60.7 19 149.3l84.1 65.7C123.7 143.3 181.2 97.5 249 97.5z"
              />
            </svg>
            Sign up with Google
          </motion.button>

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
