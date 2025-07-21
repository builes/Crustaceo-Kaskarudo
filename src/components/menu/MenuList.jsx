import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MenuCard } from "./MenuCard";
import { Button } from "../ui/Button";
import { ShoppingCartContext } from "@/context/ShoppingCartContext";

export const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const { cartItems } = useContext(ShoppingCartContext); // 1. Accede al carrito

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        setMenuItems(data.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="container">
      <div className="row g-4 justify-content-center mb-4">
        {menuItems.map((item) => (
          <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <MenuCard item={item} />
          </div>
        ))}
      </div>

      {/* 2. Mostrar botón solo si hay productos en el carrito */}
      {cartItems.length > 0 && (
        <div className="text-center">
          <Button onClick={goToCart} className="btn btn-danger">
            Confirmar pedido
          </Button>
        </div>
      )}
    </div>
  );
};
