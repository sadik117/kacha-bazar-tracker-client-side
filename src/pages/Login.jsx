import { motion } from "framer-motion";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import loginAnimation from "../assets/login.json";
import { AuthContext } from "../Authentication/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const { setUser, signIn, googleSignIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast.success("Login successful!");
      navigate(location.state || "/");
    } catch (error) {
      toast.error("Login failed!");
    }
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    googleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(location.state || "/");
        toast.success("Google Sign-In successful!");
      })
      .catch(() => {
        toast.error("Google Sign-In failed!");
      });
  };

  return (
    <div className="min-h-screen py-20 mx-2 md:mx-10 mt-5 md:mt-10 bg-gradient-to-br from-[#0f2a0f] to-[#1a3827] flex items-center justify-center px-4">
      {/* <Helmet>
        <title>Login || Kacha Bazar</title>
      </Helmet> */}

      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-4xl border border-white/20 flex flex-col md:flex-row gap-6 items-center"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        {/* Lottie Animation Section */}
        <div className="w-full md:w-1/2 md:block">
          <Lottie animationData={loginAnimation} loop={true} />
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-white text-3xl font-bold text-center mb-6">
            Welcome Back
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-white mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-white mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 transition px-4 py-2 rounded-md text-white font-semibold"
            >
              Log In
            </motion.button>
          </form>

          {/* Google Sign-In Button */}
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
            Sign in with Google
          </motion.button>

          <p className="text-center text-sm text-white/70 mt-4">
            Don’t have an account?{" "}
            <Link to="/auth/signup" className="text-green-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
