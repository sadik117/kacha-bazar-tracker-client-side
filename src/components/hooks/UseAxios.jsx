import axios from "axios";

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: "https://kacha-bazar-tracker.vercel.app",
    withCredentials: false,
  });

  return axiosInstance;
};

export default useAxios;

