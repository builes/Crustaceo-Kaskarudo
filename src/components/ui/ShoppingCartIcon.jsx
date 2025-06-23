import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { ShoppingCartContext } from "@/context/ShoppingCartContext";

export const ShoppingCartIcon = () => {
  const { totalItems } = useContext(ShoppingCartContext);

  return (
    <div className="position-relative me-2">
      <FaShoppingCart size={24} className="text-white" />
      {totalItems > 0 && (
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
          style={{ fontSize: "0.7rem" }}
        >
          {totalItems}
        </span>
      )}
    </div>
  );
};
