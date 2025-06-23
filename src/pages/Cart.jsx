import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ React Router DOM
import { ShoppingCartContext } from "@/context/ShoppingCartContext";
import { Button, Modal } from "@/components/ui";

export const Cart = () => {
  const { cartItems, clearCart } = useContext(ShoppingCartContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // ✅ Hook para redirigir

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleOrder = () => {
    setShowModal(true);
  };

  const handleClearCart = () => {
    clearCart();
    navigate("/"); // ✅ Redirigir a la página principal
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-danger">No orders yet 🍔</h2>
        <p className="text-muted">
          Your cart is empty. Go grab a Krabby Patty!
        </p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-danger">
        <div className="card-header bg-danger text-white text-center">
          <h3>Your Krusty Krab Order</h3>
        </div>
        <div className="card-body bg-light">
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-warning text-center">
                <tr>
                  <th>Item</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td className="fw-bold text-danger">{item.name}</td>
                    <td>
                      <img
                        src={`/images/${item.image}`}
                        alt={item.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td className="fw-bold text-success">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="table-danger">
                  <td colSpan="4" className="text-end fw-bold">
                    Total:
                  </td>
                  <td className="text-success fw-bold text-center">
                    ${totalPrice.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <Button className="btn-outline-danger" onClick={handleClearCart}>
              Limpiar carrito
            </Button>
            <Button className="btn-success" onClick={handleOrder}>
              Hacer pedido
            </Button>
          </div>
        </div>
        <div className="card-footer text-center text-muted">
          Thank you for choosing The Krusty Krab! 🧽🦀🍟
        </div>
      </div>

      {showModal && (
        <Modal
          title="¡Pedido realizado!"
          message="Perfecto, Bob Esponja va en camino con tu pedido. 🧽🍔"
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
