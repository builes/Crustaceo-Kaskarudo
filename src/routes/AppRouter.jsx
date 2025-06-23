// src/routes/AppRouter.jsx
import { Routes, Route } from "react-router-dom";

// Pages
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Menu } from "@/pages/Menu";
import { Cart } from "@/pages/Cart";
import { NotFound } from "@/pages/NotFound";

// Route wrappers
import { PrivateRoute } from "@/routes/PrivateRoute";
import { PublicRoute } from "@/routes/PublicRoute";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route path="/menu" element={<Menu />} />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
