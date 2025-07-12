import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useContext } from "react";
import useAxios from "../components/hooks/useAxios";
import { AuthContext } from "../Authentication/AuthProvider";
import Loading from "./Loading";


const Products = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [sort, setSort] = useState("lowToHigh");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [page, setPage] = useState(1);
  const limit = 6; // products per page

  const { data, isLoading } = useQuery({
    queryKey: ["Products", sort, startDate, endDate, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("sort", sort);
      params.append("page", page);
      params.append("limit", limit);
      if (startDate) params.append("startDate", format(startDate, "yyyy-MM-dd"));
      if (endDate) params.append("endDate", format(endDate, "yyyy-MM-dd"));

      const res = await axiosInstance.get(`/products/all?${params.toString()}`);
      return res.data;
    },
  });

  const products = data?.products || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-6xl mx-2 md:mx-10 p-4">
      <h2 className="text-2xl font-bold mb-4">🛍️ All Products</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="select select-bordered"
        >
          <option value="lowToHigh">🔼 Price: Low to High</option>
          <option value="highToLow">🔽 Price: High to Low</option>
        </select>

        {/* Date Range */}
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update);
            setPage(1);
          }}
          isClearable
          className="input input-bordered"
          placeholderText="📅 Filter by Date Range"
        />
      </div>

      {/* Products */}
      <div className="grid md:grid-cols-3 gap-6 min-h-[300px]">
        {isLoading ? (
         <div> <Loading></Loading> </div>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((p) => (
            <div key={p._id} className="border p-4 rounded-lg shadow bg-white dark:bg-gray-800">
              <img src={p.image} alt={p.itemName} className="w-full h-40 object-cover rounded" />
              <h3 className="text-lg font-semibold mt-2">{p.itemName}</h3>
              <p>💵 ৳{p.pricePerUnit} /kg</p>
              <p>📅 {p.date}</p>
              <p>🏪 {p.marketName}</p>
              <p>👨‍🌾 {p.vendorName}</p>
              <button
                onClick={() =>
                  user
                    ? navigate(`/product-details/${p._id}`)
                    : navigate("/auth/login")
                }
                className="btn btn-sm btn-primary mt-2"
              >
                🔍 View Details
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ⬅️ Prev
          </button>
          {[...Array(totalPages).keys()].map((i) => (
            <button
              key={i}
              className={`btn btn-sm ${page === i + 1 ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="btn btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next ➡️
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
