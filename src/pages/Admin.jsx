import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "@/context/ShoppingCartContext";
import { UserContext } from "@/context/UserContext";

const STATUS_OPTIONS = [
  "En progreso",
  "Listo",
  "En camino",
  "Entregado",
  "Cancelado",
];

export const Admin = () => {
  const { getTotalOrders } = useContext(ShoppingCartContext);
  const { token, role } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  let counter = 1;

  useEffect(() => {
    const loadOrders = async () => {
      if (role !== "admin") return;

      const { success, data: fetchedOrders } = await getTotalOrders(token);

      if (success) setOrders(fetchedOrders);
    };

    loadOrders();
  }, [getTotalOrders, role]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const { success, data } = await res.json();
      if (!res.ok || !success) throw new Error("Error al actualizar estado");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: data.status } : order
        )
      );
    } catch (error) {
      console.error("Error al actualizar estado:", error.message);
    }
  };

  if (role !== "admin") {
    return (
      <div className="container my-5 text-center">
        <h2 className="text-danger">Acceso denegado</h2>
        <p>Esta sección es solo para administradores.</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center text-danger">Panel de Administración</h1>
      {orders.length === 0 ? (
        <p className="text-center">No hay pedidos aún.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card mb-4 shadow">
            <div className="card-header bg-dark text-white d-flex justify-content-between">
              <span>Pedido: {counter++}</span>
              <span>
                Estado: <strong>{order.status}</strong>
              </span>
            </div>
            <div className="card-body">
              <p className="mb-2">
                <strong>Cliente:</strong> {order.userId?.name} (
                {order.userId?.email})
              </p>
              <p className="mb-2">
                <strong>Fecha:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <ul className="list-group mb-3">
                {order.items.map((item) => (
                  <li
                    key={item._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {item.name} - {item.quantity} x ${item.unitPrice}
                    </span>
                    <img
                      src={item.productId?.imageUrl}
                      alt={item.name}
                      width={50}
                      height={50}
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  </li>
                ))}
              </ul>
              <div className="d-flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(order._id, status)}
                    disabled={status === order.status}
                    className={`btn btn-sm ${
                      order.status === status
                        ? "btn-secondary"
                        : "btn-outline-primary"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
