import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Usuario autenticado
  const [token, setToken] = useState(null); // JWT
  const [role, setRole] = useState(null); // Rol del usuario
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // Cargar usuario/token desde localStorage al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setToken(storedToken);
      setUser(parsedUser);
      setRole(parsedUser.role || null); // <- Aquí obtenemos el rol
    }

    setIsLoading(false);
  }, []);

  // Guardar token y usuario en localStorage cuando cambian
  useEffect(() => {
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);

  // Login usando backend
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Credenciales incorrectas");

      const data = await res.json();
      setToken(data.data.token);
      setUser(data.data.user);
      setRole(data.data.user.role); // <- Guardamos el rol

      return true;
    } catch (error) {
      console.error("Login error:", error.message);
      return false;
    }
  };

  const registerUser = async ({ username, email, password }) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al registrarse");
      }

      setToken(data.data.token);
      setUser(data.data.user);
      setRole(data.data.user.role); // <- Guardamos el rol

      navigate("/"); // Redirige al home después de registrar

      return true;
    } catch (error) {
      console.error("Register error:", error.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null); // Limpiar rol también
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{ user, token, role, login, logout, isLoading, registerUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
