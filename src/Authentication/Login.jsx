import { motion } from "framer-motion";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import loginAnimation from "../assets/login.json";
import { AuthContext } from "./AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import SocialLogin from "./SocialLogin";

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

          <SocialLogin></SocialLogin>

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
