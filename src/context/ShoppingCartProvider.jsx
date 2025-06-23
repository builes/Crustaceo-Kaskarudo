import { useState, useEffect, useContext } from "react";
import { ShoppingCartContext } from "./ShoppingCartContext";
import { UserContext } from "./UserContext";

// Función para obtener el carrito del usuario actual desde localStorage
const getInitialCart = (username) => {
  if (!username) return [];
  const savedCart = localStorage.getItem(`cart_${username}`);
  return savedCart ? JSON.parse(savedCart) : [];
};

export const ShoppingCartProvider = ({ children }) => {
  const { user } = useContext(UserContext); // ⬅️ Obtenemos el usuario logeado
  const username = user?.username;

  const [cartItems, setCartItems] = useState([]);

  // ✅ Cargar carrito desde localStorage cuando cambia el usuario logeado
  useEffect(() => {
    if (username) {
      const initialCart = getInitialCart(username);
      setCartItems(initialCart);
    } else {
      setCartItems([]); // Si no hay usuario, vaciamos el carrito
    }
  }, [username]);

  // ✅ Guardar carrito en localStorage cada vez que cambia, por usuario
  useEffect(() => {
    if (username) {
      localStorage.setItem(`cart_${username}`, JSON.stringify(cartItems));
    }
  }, [cartItems, username]);

  // ✅ Agregar producto al carrito
  const addToCart = (item) => {
    const existingItem = cartItems.find((i) => i.id === item.id);

    if (existingItem) {
      setCartItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  // ✅ Remover producto o disminuir en uno la cantidad
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ✅ Limpiar carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // ✅ Total de ítems en el carrito
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
