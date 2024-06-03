import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import usePublic from "../hooks/usePublic";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const axiosSecure = usePublic();
  const location = useLocation();

  const { data: userData={}, isLoading: queryLoading } = useQuery({
    queryKey: ['admin', user?.uid],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await axiosSecure.get(`/user/${user?.uid}`);
      return data;
    },
    enabled: !!user, // Only run query if user is defined
  });

  if (loading || queryLoading) {
    return "loading";
  }

  if (userData?.role === 'admin') {
    return children;
  }

  return (
    <Navigate to="/login" state={location.pathname} replace={true} />
  );
};

export default AdminRoute;
