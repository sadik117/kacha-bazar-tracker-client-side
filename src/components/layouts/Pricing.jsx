import { Link } from "react-router";

 const Pricing = () => {
  return (
    <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-green-900 uppercase rounded-full bg-green-200 dark:bg-green-300 dark:text-green-900">
          Our Plans
        </p>
        <h2 className="text-3xl font-bold sm:text-2xl md:mx-auto mb-2">
          <span className="relative inline-block">
            <span className="relative">Flexible</span>
          </span>{" "}
          pricing for local vendors & users
        </h2>
        <p className="text-base md:text-lg">
          Whether you're a shopper or a vendor, choose the right plan to get the best out of our marketplace.
        </p>
      </div>

      <div className="grid max-w-md gap-10 row-gap-5 sm:row-gap-10 lg:max-w-screen-md lg:grid-cols-2 sm:mx-auto">
        {/* User Plan */}
        <div className="flex flex-col justify-between p-5 bg-white border rounded shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="mb-6">
            <div className="flex items-center justify-between pb-6 mb-6 border-b dark:border-gray-600">
              <div>
                <p className="text-sm font-bold tracking-wider uppercase text-gray-700 dark:text-gray-300">For Shoppers</p>
                <p className="text-5xl font-extrabold text-gray-900 dark:text-white">Free</p>
              </div>
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-green-100 dark:bg-green-900">
                <span className="text-4xl">🛒</span>
              </div>
            </div>
            <div>
              <p className="mb-2 font-bold tracking-wide text-gray-900 dark:text-gray-100">Included Features</p>
              <ul className="space-y-2 text-gray-800 dark:text-gray-300">
                <li className="dark:text-green-400">✔️ Compare prices from multiple markets</li>
                <li className="dark:text-green-400">✔️ Add products to your watchlist</li>
                <li className="dark:text-green-400">✔️ View price trends with interactive charts</li>
                <li className="dark:text-green-400">✔️ Purchase securely via Stripe</li>
                <li className="dark:text-green-400">✔️ Leave reviews & ratings</li>
              </ul>
            </div>
          </div>
          <div>
            <Link
              to="/auth/signup"
              className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-white bg-green-600 rounded shadow-md hover:bg-green-700 transition duration-200"
            >
              Start Using
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">No hidden costs. Enjoy full access as a user.</p>
          </div>
        </div>

        {/* Vendor Plan */}
        <div className="flex flex-col justify-between p-5 bg-white border rounded shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="mb-6">
            <div className="flex items-center justify-between pb-6 mb-6 border-b dark:border-gray-600">
              <div>
                <p className="text-sm font-bold tracking-wider uppercase text-gray-700 dark:text-gray-300">For Vendors</p>
                <p className="text-5xl font-extrabold text-gray-900 dark:text-white">৳499/mo</p>
              </div>
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-yellow-100 dark:bg-yellow-900">
                <span className="text-4xl">📢</span>
              </div>
            </div>
            <div>
              <p className="mb-2 font-bold tracking-wide text-gray-900 dark:text-gray-100">Included Features</p>
              <ul className="space-y-2 text-gray-800 dark:text-gray-300">
                <li className="dark:text-green-400">✔️ Add & manage your products with pricing history</li>
                <li className="dark:text-green-400">✔️ Promote items with advertisements</li>
                <li className="dark:text-green-400">✔️ Track user reviews and ratings</li>
                <li className="dark:text-green-400">✔️ Get insights from user activity</li>
                <li className="dark:text-green-400">✔️ Priority support & early access features</li>
              </ul>
            </div>
          </div>
          <div>
            <Link
              to="/auth/signup"
              className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-white bg-yellow-500 rounded shadow-md hover:bg-yellow-600 transition duration-200"
            >
              Join as Vendor
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Upgrade & Cancel anytime. Empower your local business.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;