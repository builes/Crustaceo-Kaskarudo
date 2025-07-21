// src/routes/AppRouter.jsx
import { Routes, Route } from "react-router-dom";

// Pages
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup"; // 👈 Asegúrate de tener esta página
import { Menu } from "@/pages/Menu";
import { Cart } from "@/pages/Cart";
import { NotFound } from "@/pages/NotFound";

// Route wrappers
import { PrivateRoute } from "@/routes/PrivateRoute";
import { PublicRoute } from "@/routes/PublicRoute";
import { Admin } from "../pages/Admin";
import { MyOrders } from "../pages/MyOrders";
import { Inventory } from "../pages/Inventory";

export const AppRouter = () => {
  return (
    <Routes>
      {/* 🏠 Página pública */}
      <Route path="/" element={<Home />} />

      <Route path="/admin" element={<Admin />} />

      <Route path="/my-orders" element={<MyOrders />} />

      <Route path="/inventory" element={<Inventory />} />

      {/* 📋 Menú público */}
      <Route path="/menu" element={<Menu />} />

      {/* 🔐 Login: solo visible si NO estás autenticado */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* 📝 Signup: solo visible si NO estás autenticado */}
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      {/* 🛒 Carrito: requiere sesión */}
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />

      {/* ❌ Ruta no encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
