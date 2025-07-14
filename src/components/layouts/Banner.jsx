import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat min-h-[380px] flex items-center mx-2 md:mx-10"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/ynKVV7MJ/jacopo-maiarelli-g-OUx23-DNks-unsplash.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/60"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
        <motion.h1
          className="text-2xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to কাঁচাবাজার
        </motion.h1>
        <motion.p
          className="text-sm md:text-lg max-w-xl mx-auto mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Your daily destination for fresh local produce, fair pricing, and trusted vendors. Compare prices and shop smarter!
        </motion.p>
        <motion.a
          href="/products"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-2 rounded-lg transition"
        >
          Explore Products
        </motion.a>
      </div>
    </section>
  );
};

export default Banner;
