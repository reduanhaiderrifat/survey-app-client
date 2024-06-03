import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_URL,
});
const usePublic = () => {
  return axiosPublic;
};

export default usePublic;
