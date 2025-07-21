import { useState, useEffect, useContext } from "react";
import { ShoppingCartContext } from "./ShoppingCartContext";
import { UserContext } from "./UserContext";

export const ShoppingCartProvider = ({ children }) => {
  const { token } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        setCartItems([]);
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { success, data } = await res.json();
        if (!res.ok || !success)
          throw new Error("No se pudo obtener el carrito");

        const formatted = (data || []).map((item) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          quantity: item.quantity,
          total: item.total,
        }));

        setCartItems(formatted);
      } catch (error) {
        console.error("Error al cargar carrito:", error.message);
      }
    };

    fetchCart();
  }, [token]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await fetch("http://localhost:3000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const { success, data } = await res.json();
      if (!res.ok || !success)
        throw new Error("No se pudo agregar el producto");

      const formatted = data.items.map((item) => ({
        _id: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        imageUrl: item.productId.imageUrl,
        description: item.productId.description,
        quantity: item.quantity,
        total: item.quantity * item.productId.price,
      }));

      setCartItems(formatted);
    } catch (error) {
      console.error("Error al agregar producto:", error.message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { success, data } = await res.json();
      if (!res.ok || !success)
        throw new Error("No se pudo eliminar el producto");

      const formatted = data.items.map((item) => ({
        _id: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        imageUrl: item.productId.imageUrl,
        description: item.productId.description,
        quantity: item.quantity,
        total: item.quantity * item.productId.price,
      }));

      setCartItems(formatted);
    } catch (error) {
      console.error("Error al eliminar producto:", error.message);
    }
  };

  const clearCart = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/cart", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const { success } = await res.json();
      if (!res.ok || !success) throw new Error("No se pudo limpiar el carrito");

      setCartItems([]);
    } catch (error) {
      console.error("Error al limpiar el carrito:", error.message);
    }
  };

  const getOrders = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { success, data, error } = await res.json();

      if (!res.ok || !success) {
        throw new Error(error || "No se pudieron obtener los pedidos");
      }

      return { success: true, orders: data || [] };
    } catch (error) {
      console.error("Error al obtener pedidos:", error.message);
      return { success: false, error: error.message, orders: [] };
    }
  };

  const getTotalOrders = async (token) => {
    try {
      const res = await fetch("http://localhost:3000/api/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { success, data, total, message } = await res.json();

      if (!res.ok || !success) {
        throw new Error(message || "No se pudo obtener el total de pedidos");
      }

      return {
        success: true,
        data,
        total,
      };
    } catch (error) {
      console.error("Error al obtener el total de pedidos:", error.message);
      return {
        success: false,
        data: null,
        total: 0,
        error: error.message,
      };
    }
  };

  const confirmOrder = async () => {
    try {
      const { success, orders, error } = await getOrders();

      if (!success) {
        throw new Error(
          error || "No se pudieron verificar los pedidos previos"
        );
      }

      if (orders.length > 0) {
        const latestOrder = orders[0];
        const status = latestOrder.status;

        if (status !== "Entregado" && status !== "Cancelado") {
          return {
            success: false,
            error: "Tienes un pedido en curso. Espera a que se complete.",
            status,
          };
        }
      }

      const res = await fetch("http://localhost:3000/api/cart/confirm", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { success: confirmSuccess, data, message } = await res.json();

      if (!res.ok || !confirmSuccess) {
        throw new Error(message || "No se pudo confirmar la orden");
      }

      setCartItems([]);
      return { success: true, data };
    } catch (error) {
      console.error("Error al confirmar orden:", error.message);
      return { success: false, error: error.message };
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getOrders,
        getTotalOrders,
        confirmOrder,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
