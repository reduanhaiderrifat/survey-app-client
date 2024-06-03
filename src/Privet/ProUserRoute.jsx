import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import usePublic from "../hooks/usePublic";

const ProUserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const axiosSecure = usePublic();


  const { data: userData={}, isLoading: queryLoading } = useQuery({
    queryKey: ['user', user?.uid],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await axiosSecure.get(`/user/${user?.uid}`);
      return data;
    },
    enabled: !!user, 
  });

  if (loading || queryLoading) {
    return "loading/";
  }

  if (userData?.role === 'Pro-User') {
    return children;
  }

  return (
    <Navigate to="/"/>
  );
};

export default ProUserRoute;