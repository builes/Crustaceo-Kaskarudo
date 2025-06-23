import { useContext } from "react";
import { UserContext } from "@/context/UserContext"; // Asegúrate de que la ruta sea correcta

export const Footer = () => {
  const { user } = useContext(UserContext);

  return (
    <footer className="bg-danger text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          {/* Branding */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="fw-bold">
              <span role="img" aria-label="burger">
                🍔
              </span>{" "}
              KK Food
            </h5>
            <p className="small">
              Deliciosa comida rápida con el toque único de KK. ¡Sabor que
              enamora en cada mordida!
            </p>
          </div>

          {/* Navegación */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h6 className="fw-semibold">Navegación</h6>
            <ul className="list-unstyled small">
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/menu" className="text-white text-decoration-none">
                  Menú
                </a>
              </li>
              {user && (
                <li>
                  <a href="/cart" className="text-white text-decoration-none">
                    Carrito
                  </a>
                </li>
              )}
              {!user && (
                <li>
                  <a href="/login" className="text-white text-decoration-none">
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-md-4">
            <h6 className="fw-semibold">Contáctanos</h6>
            <ul className="list-unstyled small">
              <li>📍 Calle Sabor 123, Ciudad KK</li>
              <li>📞 (123) 456-7890</li>
              <li>✉️ contacto@kkfood.com</li>
            </ul>
          </div>
        </div>

        <hr className="border-light my-4" />

        {/* Línea inferior */}
        <div className="text-center small">
          © {new Date().getFullYear()} KK Food. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
