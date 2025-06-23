import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center  text-white">
      <h1 className="display-1 text-danger fw-bold">404</h1>
      <h2 className="mb-3">¡Página no encontrada!</h2>
      <p className="mb-4">
        Parece que esta página se fue a comer una Krabby Patty 🍔
      </p>
      <Link to="/" className="btn btn-danger">
        Volver al inicio
      </Link>
    </div>
  );
};
