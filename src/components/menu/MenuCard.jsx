import { Button } from "@/components/ui/Button";
import { useContext, useState } from "react";
import { UserContext, ShoppingCartContext } from "@/context";
import { Modal } from "@/components/ui/Modal";

export const MenuCard = ({ item }) => {
  const { _id, name, price, description, imageUrl } = item;
  const { user } = useContext(UserContext);
  const { cartItems, addToCart, removeFromCart } =
    useContext(ShoppingCartContext);

  const [showModal, setShowModal] = useState(false);

  const quantityInCart = cartItems.find((i) => i._id === _id)?.quantity || 0;

  const handleAdd = async () => {
    if (!user) {
      setShowModal(true);
      return;
    }

    try {
      await addToCart(_id);
    } catch (error) {
      console.error("Error al agregar al carrito:", error.message);
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromCart(_id);
    } catch (error) {
      console.error("Error al remover del carrito:", error.message);
    }
  };

  return (
    <>
      <div className="card h-100 border-danger shadow-sm">
        <img
          src={imageUrl}
          alt={name}
          className="card-img-top"
          style={{ objectFit: "cover", height: "200px" }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title text-danger">{name}</h5>
            <p className="card-text text-muted">{description}</p>
          </div>

          <div className="mt-3">
            <span className="fw-bold text-success">${price.toFixed(2)}</span>
          </div>

          {quantityInCart > 0 ? (
            <div className="d-flex justify-content-between align-items-center mt-2">
              <Button
                className="btn-sm btn-outline-danger"
                onClick={handleRemove}
              >
                −
              </Button>
              <span className="mx-2">{quantityInCart}</span>
              <Button
                className="btn-sm btn-outline-success"
                onClick={handleAdd}
              >
                +
              </Button>
            </div>
          ) : (
            <div className="d-grid mt-3">
              <Button className="btn-sm btn-outline-danger" onClick={handleAdd}>
                Add
              </Button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <Modal
          title="Oops!"
          message="You must be logged in to add items to the cart!"
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};
