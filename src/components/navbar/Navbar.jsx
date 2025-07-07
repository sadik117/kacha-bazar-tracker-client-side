import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router";
 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
//   const { user, logout } = useContext(AuthContext); 
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    const root = window.document.documentElement;
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
      <li><NavLink to="/" className="hover:text-primary">Home</NavLink></li>
      <li><NavLink to="/products" className="hover:text-primary">All Products</NavLink></li>
      <li><NavLink to="/offers" className="hover:text-primary">Offers</NavLink></li>
      {user ? (
        <li><NavLink to="/dashboard" className="hover:text-primary">Dashboard</NavLink></li>
      ) : null}
    </>
  );

  return (
    <motion.header
      className="bg-base-100 dark:bg-dark text-dark dark:text-white shadow-md sticky top-0 z-50"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary dark:text-secondary flex items-center gap-2">
          🥬 <span>কাঁচাবাজার</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 font-medium">{navLinks}</ul>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-circle bg-transparent border-none hover:bg-base-200 text-xl"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>

          {/* Auth Buttons */}
          {user ? (
            <>
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-9 h-9 rounded-full ring ring-primary ring-offset-2"
              />
              <button onClick={logout} className="btn btn-sm btn-outline">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-sm btn-ghost">Login</NavLink>
              <NavLink to="/signup" className="btn btn-sm btn-primary text-white">Sign Up</NavLink>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden px-4 py-2 space-y-2 bg-base-100 dark:bg-dark font-medium">
          {navLinks}
        </ul>
      )}
    </motion.header>
  );
};

export default Navbar;
