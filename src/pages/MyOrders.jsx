import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "@/context/ShoppingCartContext";
import { UserContext } from "@/context/UserContext";

export const MyOrders = () => {
  const { getOrders } = useContext(ShoppingCartContext);
  const { token } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  let counter = 1;

  useEffect(() => {
    const loadOrders = async () => {
      const { success, orders: fetchedOrders } = await getOrders();
      if (success) setOrders(fetchedOrders);
    };

    if (token) loadOrders();
  }, [getOrders, token]);

  useEffect(() => {
    console.log("Pedidos cargados:", orders);
  }, [orders]);

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Mis Pedidos</h1>
      {orders.length === 0 ? (
        <p className="text-center">No tienes pedidos aún.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card mb-4 shadow">
            <div className="card-header bg-primary text-white d-flex justify-content-between">
              <span>Pedido: {counter++}</span>
              <span>
                Estado: <strong>{order.status}</strong>
              </span>
            </div>
            <div className="card-body">
              <ul className="list-group mb-3">
                {order.items.map((item) => (
                  <li
                    key={item._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {item.productId?.name} - {item.quantity} x $
                      {item.unitPrice}
                    </span>
                    <img
                      src={item.productId?.imageUrl}
                      alt={item.productId?.name}
                      width={50}
                      height={50}
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  </li>
                ))}
              </ul>
              <div className="text-end">
                <strong>
                  Total: $
                  {order.items
                    .reduce(
                      (sum, item) => sum + item.quantity * item.unitPrice,
                      0
                    )
                    .toFixed(2)}
                </strong>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
