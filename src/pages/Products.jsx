import { useEffect, useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import useAxios from "../components/hooks/useAxios";
import { AuthContext } from "../Authentication/AuthProvider";
import Loading from "./Loading";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";

const Products = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [sort, setSort] = useState("lowToHigh");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading } = useQuery({
    queryKey: ["Products", sort, startDate, endDate, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("sort", sort);
      params.append("page", page);
      params.append("limit", limit);
      if (startDate)
        params.append("startDate", format(startDate, "yyyy-MM-dd"));
      if (endDate) params.append("endDate", format(endDate, "yyyy-MM-dd"));
      const res = await axiosInstance.get(`/products/all?${params.toString()}`);
      return res.data;
    },
  });

  const products = data?.products || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <Helmet>
        <title>KachaBazar || All Products</title>
      </Helmet>
      
      <h2 className="text-2xl font-bold mb-2 justify-center items-center ml-6 md:ml-13 mt-6">
        🛍️ All Products
      </h2>
      
      <div className="max-w-6xl mx-2 md:mx-10 p-4 text-gray-800 dark:text-gray-100">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="select select-bordered dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="lowToHigh">🔼 Price: Low to High</option>
            <option value="highToLow">🔽 Price: High to Low</option>
          </select>

          {/* Date Range Picker */}
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
              setPage(1);
            }}
            isClearable
            className="input input-bordered dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholderText="📅 Filter by Date Range"
          />
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 gap-6 min-h-[300px]">
          {isLoading ? (
            <div className="col-span-3">
              <Loading />
            </div>
          ) : products.length === 0 ? (
            <p className="col-span-3 text-gray-500 dark:text-gray-400">
              No products found.
            </p>
          ) : (
            products.map((p) => (
              <div
                key={p._id}
                className="border rounded-lg p-4 shadow bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <img
                  src={p.image}
                  alt={p.itemName}
                  className="w-full h-40 object-cover rounded"
                />
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
                  className="btn btn-sm btn-primary mt-2 dark:text-white"
                >
                  🔍 View Details
                </button>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center flex-wrap gap-2">
            <button
              className="btn btn-sm dark:bg-gray-700 dark:text-white"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ⬅️ Prev
            </button>
            {[...Array(totalPages).keys()].map((i) => (
              <button
                key={i}
                className={`btn btn-sm ${
                  page === i + 1
                    ? "btn-primary dark:text-white"
                    : "btn-ghost dark:bg-gray-700 dark:text-white"
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="btn btn-sm dark:bg-gray-700 dark:text-white"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next ➡️
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
