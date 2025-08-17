import { motion } from "framer-motion";
import { Leaf, TrendingUp, ShieldCheck } from "lucide-react";

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600 dark:text-green-400" />,
      title: "Fresh & Local",
      desc: "Get real-time prices of fresh produce directly from local vendors and farmers.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />,
      title: "Price Transparency",
      desc: "Track market price trends and compare across vendors to save more every day.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-600 dark:text-green-400" />,
      title: "Trusted Platform",
      desc: "Secure and reliable platform with verified vendors and authentic data.",
    },
  ];

  return (
    <section className="py-8 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold dark:text-gray-100"
        >
          🌟 Why Choose <span className="text-green-600">কাঁচাবাজার?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 dark:text-gray-400 max-w-2xl mx-auto"
        >
          We bring local markets closer to you with live price tracking, vendor transparency, 
          and fresh deals — making healthy living affordable and accessible.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg 
                         flex flex-col items-center text-center"
            >
              {feature.icon}
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
