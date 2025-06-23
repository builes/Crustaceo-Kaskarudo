import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button
      className="btn btn-outline-light rounded-pill px-4 py-1"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
};
