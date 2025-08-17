import { motion } from "framer-motion";

const NewsletterSection = () => {
  return (
    <section className=" py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold dark:text-gray-100"
        >
          📩 Stay Updated With কাঁচাবাজার
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4  dark:text-gray-400"
        >
          Subscribe to our newsletter and never miss out on the latest price updates, 
          offers, and fresh deals from your local markets.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 w-full sm:w-80 rounded-xl border border-gray-300 dark:border-gray-700 
                       focus:ring-2 focus:ring-green-500 outline-none 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            disabled
          />
          <button
            type="button"
            disabled
            className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-lg
                       hover:bg-green-700 disabled:opacity-70"
          >
            Subscribe
          </button>
        </motion.form>

        <p className="mt-3 text-sm dark:text-gray-400">
          🔒 Your privacy is safe with us. Stay Connected.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
