import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { ShoppingCartIcon } from "../ui/ShoppingCartIcon";

export const Navbar = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  const isAdmin = user?.role === "admin";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger px-3">
      <Link className="navbar-brand" to="/">
        Krusty Krab
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        {/* Enlaces principales */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/menu">
              Menu
            </Link>
          </li>

          {user && (
            <>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center" to="/cart">
                  <ShoppingCartIcon className="me-1" />
                  Cart
                </Link>
              </li>

              {isAdmin ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/inventory">
                      Inventory
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      Admin
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/my-orders">
                    My Orders
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>

        {/* Área de usuario */}
        <ul className="navbar-nav ms-auto">
          {user ? (
            <>
              <li className="nav-item d-flex align-items-center text-white me-3">
                Hola <strong className="ms-1">{user.username}</strong>
              </li>
              <li className="nav-item">
                <LogoutButton />
              </li>
            </>
          ) : (
            <>
              {!isLoginPage && (
                <li className="nav-item me-2">
                  <Link className="btn btn-outline-light" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {!isSignupPage && (
                <li className="nav-item">
                  <Link className="btn btn-light text-danger" to="/signup">
                    Sign Up
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
