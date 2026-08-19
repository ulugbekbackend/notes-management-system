import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * Wrap any route element that should only be reachable while logged in.
 * Previously /dashboard and /settings had no guard at all -- anyone could
 * open them directly by URL, logged in or not.
 */
export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
