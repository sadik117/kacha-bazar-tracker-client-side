import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { role } = useUserRole();
  
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="min-h-full mx-2 md:mx-10 flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900">
      {/* 🔘 Mobile Topbar */}
      <div
        className={`md:hidden sticky top-0 z-50 bg-gray-100 dark:bg-gray-900 p-3 border-b border-gray-300 dark:border-gray-700 flex items-center gap-2 ${
          isDrawerOpen ? "hidden" : "flex"
        }`}
      >
        <button
          onClick={toggleDrawer}
          className="p-2 bg-white dark:bg-gray-800 border rounded shadow-md"
          aria-label="Toggle sidebar"
        >
          <FiMenu size={20} className="text-gray-800 dark:text-gray-200" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 ml-2">
          Dashboard
        </h2>
      </div>

      {/* 🔘 Mobile Backdrop */}
      {isDrawerOpen && (
        <div
          onClick={closeDrawer}
          className="md:hidden fixed inset-0 bg-black bg-opacity-30 z-30"
        />
      )}

      {/* 🔘 Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-md p-4 z-40 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="md:hidden flex justify-end mb-2">
          <button
            onClick={closeDrawer}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FiX size={22} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <h2 className="text-xl font-bold mt-5 md:mt-0 mb-4 text-gray-800 dark:text-gray-100 border p-1">
          Dashboard
        </h2>

        <nav className="flex flex-col gap-2 text-gray-700 dark:text-gray-300">
          {role === "user" && (
            <>
              <NavLink to="/dashboard/price-trends" onClick={closeDrawer}>
                📊 View Price Trends
              </NavLink>
              <NavLink to="/dashboard/watchlist" onClick={closeDrawer}>
                🛠️ Manage Watchlist
              </NavLink>
              <NavLink to="/dashboard/my-orders" onClick={closeDrawer}>
                🛒 My Order List
              </NavLink>
            </>
          )}

          {role === "vendor" && (
            <>
              <NavLink to="/dashboard/add-product" onClick={closeDrawer}>
                📝 Add Product
              </NavLink>
              <NavLink to="/dashboard/my-products" onClick={closeDrawer}>
                📄 My Products
              </NavLink>
              <NavLink to="/dashboard/add-advertisement" onClick={closeDrawer}>
                📢 Add Advertisement
              </NavLink>
              <NavLink to="/dashboard/my-ads" onClick={closeDrawer}>
                📊 My Advertisements
              </NavLink>
            </>
          )}

          {role === "admin" && (
            <>
              <NavLink to="/dashboard/all-users" onClick={closeDrawer}>
                👥 All Users
              </NavLink>
              <NavLink to="/dashboard/all-products" onClick={closeDrawer}>
                📋 All Products
              </NavLink>
              <NavLink to="/dashboard/all-ads" onClick={closeDrawer}>
                📢 All Advertisements
              </NavLink>
              <NavLink to="/dashboard/all-orders" onClick={closeDrawer}>
                🛒 All Orders
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      {/* 🔘 Main Content */}
      <main className="flex-1 p-4 text-gray-800 dark:text-gray-200 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
