import axios from "axios";

const usePublic = () => {
  const axiosPublic = axios.create({
    baseURL: `${import.meta.env.VITE_URL}`,
  });
  return axiosPublic;
};

export default usePublic;
