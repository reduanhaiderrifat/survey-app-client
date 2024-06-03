import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_URL,
});
const useAxiosSecure = () => {
    const {logOut} = useAuth()
    const navigate = useNavigate()
  axiosSecure.interceptors.request.use(
    function (config) {
        const token=localStorage.getItem('token')
        config.headers.authorization=`Bearer ${token}`
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
 axiosSecure.interceptors.response.use(function(response){
    return response;
 }, async(error)=>{
    const status= error.response.status;
    if(status===401|| status===403){
       await logOut()
navigate('/login')
    }
    return Promise.reject(status)
 })
  return axiosSecure;
};

export default useAxiosSecure;
