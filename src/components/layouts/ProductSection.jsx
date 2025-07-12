import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../components/hooks/UseAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import { motion } from "framer-motion";
import Loading from "../../pages/Loading";

const ProductSection = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["approvedProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/approved-products");
      return res.data;
    },
  });

  const handleDetails = (id) => {
    if (!user) {
      navigate("/auth/login");
    } else {
      navigate(`/product-details/${id}`);
    }
  };

  return (
    <section className="max-w-6xl mx-auto py-10 px-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        🛍️ Latest Market Prices
      </h2>

      {isLoading ? (
        <div>
          {" "}
          <Loading></Loading>{" "}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-md p-4 border"
            >
              <img
                src={product.image}
                alt={product.marketName}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl font-semibold mb-1">
                {product.marketName}
              </h3>

              <p className="text-sm mb-3 text-gray-700">
                🧺 {product.itemName} — ৳
                {product.prices?.[product.prices.length - 1]?.price}/kg
              </p>

              <p className="text-sm text-gray-500 mb-2">📅 {product.date}</p>

              <button
                onClick={() => handleDetails(product._id)}
                className="btn btn-sm btn-primary w-full"
              >
                🔍 View Details
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductSection;
