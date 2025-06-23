import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Usuario actualmente logueado
  const [userList, setUserList] = useState([]); // Lista de usuarios desde el JSON simulado
  const [isLoading, setIsLoading] = useState(true); // Control para saber si ya cargó la sesión inicial

  // ✅ Carga inicial: obtener usuarios simulados desde un archivo JSON (como si fuera una API)
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch("/data/users.json");
        const data = await res.json();
        setUserList(data); // Guardamos usuarios disponibles
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    loadUsers();
  }, []);

  // ✅ Cargar usuario actual desde localStorage (persistencia)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false); // Indica que la app ya está lista para acceder a las rutas protegidas.
  }, []);

  // ✅ Guardar o limpiar usuario actual en localStorage cuando cambia
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // ✅ Función de login: verifica si username y password están en el JSON
  const login = (username, password) => {
    const foundUser = userList.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser({ username: foundUser.username }); // Solo guardamos el username
      return true; // Login exitoso
    }

    return false; // Login fallido
  };

  // ✅ Logout: limpia el usuario actual
  const logout = () => {
    setUser(null);
  };

  // ✅ Proveemos todo lo necesario a los componentes hijos
  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
