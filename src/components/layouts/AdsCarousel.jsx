import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import useAxios from "../hooks/useAxios";

const AdsCarousel = () => {
  const axios = useAxios();

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["ads"],
    queryFn: async () => {
      const res = await axios.get("/ads");
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center">Loading advertisements...</p>;

  return (
    <div className="max-w-6xl md:mx-10 mx-2 px-4 py-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        📢 Advertisement Highlights
      </h2>

      {ads.length === 0 ? (
        <p className="text-center text-gray-500">
          No ads available at the moment.
        </p>
      ) : (
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          
          spaceBetween={30}
          slidesPerView={1}
          loop
        >
          {ads.map((ad) => (
            <SwiperSlide key={ad._id}>
              <div className="flex flex-col items-center justify-center h-2/3 p-6 md:p-8 bg-yellow-50 dark:bg-gray-900 rounded-2xl shadow-xl border-l-4 border-yellow-500">

               <div className="text-center max-w-2xl mb-2">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-yellow-700 dark:text-yellow-300">
                    {ad.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm md:text-md leading-relaxed">
                    {ad.description}
                  </p>
                </div>

                 {ad.image && (
                  <div className="w-full mt-5 flex justify-center items-center">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="max-h-[55vh] w-auto object-contain rounded-xl border shadow-md transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                )}

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default AdsCarousel;
