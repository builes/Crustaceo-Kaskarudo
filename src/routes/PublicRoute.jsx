import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { Loader } from "@/components/ui/Loader";

export const PublicRoute = ({ children }) => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) return <Loader />;

  return !user ? children : <Navigate to="/" />;
};
