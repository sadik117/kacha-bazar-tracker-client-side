import { useQuery } from "@tanstack/react-query";
import useAxios from "../components/hooks/useAxios";
import { Helmet } from "react-helmet-async";
import Loading from "./Loading";

const Offers = () => {
  const axios = useAxios();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["offers"],
    queryFn: async () => {
      const res = await axios.get("/offers");
      return res.data;
    },
  });

  const offers = Array.isArray(data) ? data : [];

  if (isLoading)
    return (
      <Loading></Loading>
    );
  if (isError)
    return <p className="text-red-500 text-center">Error: {error?.message}</p>;

  return (
    <>
      <Helmet>
        <title>KachaBazar || Offers</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-center mt-5">
        🎁 Special Market Offers
      </h2>
      <div className="max-w-4xl mx-auto p-4 text-gray-800 dark:text-gray-200">
        {offers.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No offers available right now.
          </p>
        ) : (
          <div className="space-y-4">
            {offers.map((offer) => (
              <div
                key={offer._id}
                className="bg-yellow-100 dark:bg-yellow-200/20 p-4 rounded shadow-md border-l-4 border-yellow-500"
              >
                <h3 className="text-xl font-semibold dark:text-yellow-100">
                  {offer.title}
                </h3>
                <p className="dark:text-gray-300">{offer.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Offers;
