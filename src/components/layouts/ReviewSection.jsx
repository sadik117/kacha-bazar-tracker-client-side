import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Amina Rahman",
    role: "Regular Shopper",
    review:
      "This platform has completely changed how I shop for groceries! Prices are transparent and I always find fresh items at fair rates.",
    rating: 5,
    image: "https://i.ibb.co.com/TqN9204t/istockphoto-2004891062-612x612.jpg",
  },
  {
    id: 2,
    name: "Sadik Sourov",
    role: "Vendor",
    review:
      "As a vendor, I can now easily showcase my products and connect with more buyers. The dashboard makes managing everything effortless!",
    rating: 4,
    image: "https://i.ibb.co.com/8RNz5sL/294054924-1234401560705223-8929304504147505099-n.jpg",
  },
  {
    id: 3,
    name: "Zahid Hasan",
    role: "Customer",
    review:
      "Absolutely love the smooth experience! The advertisements and offers keep me updated about the best deals in local markets.",
    rating: 5,
    image: "https://i.ibb.co.com/k27fs6xx/istockphoto-1475634137-612x612.jpg ",
  },
];

const ReviewSection = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 dark:text-white">
        ❤️ What People Say About Us
      </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transition-colors"
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-yellow-400"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                {review.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {review.role}
              </p>
              <div className="flex justify-center my-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {review.review}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewSection;
