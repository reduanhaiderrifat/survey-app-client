import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import usePublic from "../hooks/usePublic";
import Loader from "../components/loader/Loader";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const axiosSecure = usePublic();


  const { data: userData={}, isLoading: queryLoading } = useQuery({
    queryKey: ['admin', user?.uid],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await axiosSecure.get(`/user/${user?.uid}`);
      return data;
    },
    enabled: !!user,
  });

  if (loading || queryLoading) {
    return <Loader/>;
  }

  if (userData?.role === 'admin') {
    return children;
  }

  return (
    <Navigate to="/" />
  );
};

export default AdminRoute;
