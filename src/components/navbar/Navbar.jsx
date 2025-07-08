import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { AuthContext } from "../../Authentication/AuthProvider";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const navLinks = (
    <>
      <li><NavLink to="/" className="text-black text-sm hover:text-primary">Home</NavLink></li>
      <li><NavLink to="/products" className="text-black text-sm hover:text-primary">All Products</NavLink></li>
      <li><NavLink to="/offers" className="text-black text-sm hover:text-primary">Offers</NavLink></li>
      {user && (
        <li><NavLink to="/dashboard" className="text-black text-sm hover:text-primary">Dashboard</NavLink></li>
      )}
    </>
  );

  return (
    <motion.header
      className="bg-base-100 mx-2 md:mx-10 dark:bg-neutral text-neutral-content shadow-md sticky top-0 z-50"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto bg-secondary px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary dark:text-secondary flex items-center gap-2">
          <img className="w-6 md:w-10" src="https://i.ibb.co/FLM5DLmm/vegetable.png" alt="logo" /> <span className="text-sm md:text-lg">কাঁচাবাজার</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 font-medium">{navLinks}</ul>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-circle bg-transparent border-none hover:bg-base-200 text-xl"
            title="Toggle Theme"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>

          {/* Auth Actions */}
          {user ? (
            <>
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-9 h-9 rounded-full ring ring-primary ring-offset-2"
              />
              <button onClick={logOut} className="btn btn-sm btn-outline text-primary hover:bg-primary hover:text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/auth/login" className="btn btn-sm btn-ghost text-black">Login</NavLink>
              <NavLink to="/auth/signup" className="btn btn-sm btn-primary text-white">Sign Up</NavLink>
            </>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-2xl text-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden px-4 py-2 space-y-2 bg-base-100 dark:bg-neutral font-medium">
          {navLinks}
        </ul>
      )}
    </motion.header>
  );
};

export default Navbar;
