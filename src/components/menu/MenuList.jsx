import { useEffect, useState } from "react";
import { MenuCard } from "./MenuCard";

export const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("/data/menu.json");
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="row g-4 justify-content-center">
      {menuItems.map((item) => (
        <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <MenuCard item={item} />
        </div>
      ))}
    </div>
  );
};
