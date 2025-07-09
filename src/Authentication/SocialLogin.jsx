import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAxios from "../components/hooks/useAxios";


const SocialLogin = () => {
  const { googleSignIn, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const axios = useAxios();

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;

      // Prepare user info for backend
      const userInfo = {
        email: user.email,
        name: user.displayName || "No Name",
        photoURL: user.photoURL || "",
        role: "user", // default role
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      // Send user info to backend and get JWT token
      const res = await axios.post("/users", userInfo);

      // Save JWT token in localStorage
      const token = res.data.token;
      if (token) {
        localStorage.setItem("access-token", token);
      } else {
        // Optionally handle missing token case
        console.error("JWT token not received from backend");
      }

      // Update user in auth context
      setUser(user);

      // Navigate to intended page or home
      navigate(from);
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  return (
    <div>
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
        Login with Google
      </motion.button>
    </div>
  );
};

export default SocialLogin;
