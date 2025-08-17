import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router";
import { MdDeveloperBoard } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-300 to-orange-200  text-base-content px-4 py-10 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand & Description */}
        <div className="mx-0 md:mx-5">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary"
          >
            <img
              className="w-6 md:w-10"
              src="https://i.ibb.co/FLM5DLmm/vegetable.png"
              alt="logo"
            />{" "}
            <span>কাঁচাবাজার</span>
          </Link>
          <p className="mt-3 text-sm">
            Daily price tracking platform for local markets. Compare prices,
            track trends, and shop smarter.
          </p>
        </div>

        {/* Legal & Info */}
        <div className="ml-0 md:ml-20">
          <h3 className="text-lg font-semibold text-primary mb-2">Info</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="ml-0 md:ml-20">
          <h3 className="text-lg font-semibold text-primary mb-2">
            Connect With Us
          </h3>
          <div className="flex gap-4 text-xl mt-2">
            <a
              href="https://www.facebook.com/sadiksourov11/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/sadiksourov117"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com/in/sadiksourov11"
              target="_blank"
              className="hover:text-white"
            >
              <FaLinkedin></FaLinkedin>
            </a>
            <a
              href="mailto:sadiksourov11@gmail.com"
              className="hover:text-white"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm mt-8 border-t border-base-300 pt-4">
        &copy; {new Date().getFullYear()} কাঁচাবাজার. All rights reserved.
      </div>
      <div className="text-start ml-20 md:ml-0 md:text-center text-sm text-black mt-2 md:mt-2">
        <MdDeveloperBoard className="inline -mt-0.5"></MdDeveloperBoard> Developed by Sadik Sourov.
      </div>
    </footer>
  );
};

export default Footer;
