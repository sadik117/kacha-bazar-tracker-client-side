import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Loading from "./Loading";
import { AuthContext } from "../Authentication/AuthProvider";
import useAxios from "../components/hooks/useAxios";
import useAxiosSecure from "../components/hooks/UseAxiosSecure";

const ProductDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user, role } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // Fetch product details
  const { data: product, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  // Fetch price history
  const { data: priceData = [] } = useQuery({
    queryKey: ["priceHistory", id],
    queryFn: async () => {
      const res = await axios.get(`/products/${id}/history`);
      return res.data;
    },
  });

  // Fetch reviews
  const {
    data: reviews = [],
    isLoading: loadingReviews,
    isError: reviewsError,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axios.get(`/reviews/${id}`);
      return res.data;
    },
  });

  // Add to Watchlist
  const handleWatchlist = async () => {
    try {
      await axiosSecure.post("/watchlist", {
        productId: id,
        userEmail: user.email,
      });
      toast.success("Added to Watchlist");
    } catch {
      toast.error("Failed to add to Watchlist");
    }
  };

  // Buy Product
  const handleBuy = async () => {
    try {
      const res = await axiosSecure.post("/create-payment", {
        productId: id,
        email: user.email,
        price: product.pricePerUnit,
      });

      window.location.href = res.data.url; // Redirect to Stripe Checkout
    } catch {
      toast.error("Payment initiation failed");
    }
  };

  // Submit Review
  const handleReview = async () => {
    if (!rating || !comment.trim()) return toast.error("Fill both fields");

    try {
      await axiosSecure.post("/reviews", {
        productId: id,
        userEmail: user.email,
        userName: user.displayName,
        rating,
        comment,
        date: new Date().toISOString(),
      });

      toast.success("Review submitted");
      setComment("");
      setRating(0);
      queryClient.invalidateQueries(["reviews", id]);
    } catch {
      toast.error("Review submission failed");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">{product.itemName}</h2>
      <img
        src={product.image}
        alt=""
        className="w-full max-h-72 object-cover rounded"
      />
      <p className="text-gray-600 dark:text-white mt-2">📅 {product.date}</p>
      <p>🏪 Market: {product.marketName}</p>
      <p>👨‍🌾 Vendor: {product.vendorName}</p>
      <p className="text-xl font-semibold">💵 ৳{product.pricePerUnit} /kg</p>

      {role !== "admin" && role !== "vendor" && (
        <div className="flex gap-4 mt-4">
          <button className="btn btn-outline" onClick={handleWatchlist}>
            ⭐ Add to Watchlist
          </button>
          <button className="btn btn-primary" onClick={handleBuy}>
            🛒 Buy Product
          </button>
        </div>
      )}

      {/* Price Trend Chart */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">📈 Price Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#10B981" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Review Form */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold">💬 Write a Review</h3>
        <input
          type="number"
          max={5}
          min={1}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          placeholder="Rating (1-5)"
          className="input input-bordered w-full mb-2"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your thoughts..."
          className="textarea textarea-bordered w-full"
        />
        <button className="btn btn-success mt-2" onClick={handleReview}>
          Submit Review
        </button>
      </div>

      {/* Show Reviews */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">🗣️ User Reviews</h3>

        {loadingReviews && <p>Loading reviews...</p>}
        {reviewsError && <p className="text-red-500">Failed to load reviews</p>}

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div key={r._id} className="border rounded p-3 mb-2 bg-gray-50">
              <p className="font-medium">
                {r.userName} ({r.userEmail})
              </p>
              <p>⭐ {r.rating} / 5</p>
              <p className="text-sm text-gray-600">
                {format(new Date(r.date), "PP")}
              </p>
              <p>{r.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
