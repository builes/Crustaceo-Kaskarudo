import { useState, useContext } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext"; // Asegúrate de que la ruta sea correcta

export const SignupForm = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext); // Llamada al contexto

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Validación de Plankton
    const lowerUsername = username.toLowerCase();
    const lowerEmail = email.toLowerCase();
    if (lowerUsername.includes("plankton") || lowerEmail.includes("plankton")) {
      setModalOpen(true);
      return;
    }

    // Validación de contraseña
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // Petición al backend mediante el contexto
    const success = await registerUser({ username, email, password });

    if (success) {
      navigate("/"); // Redirigir al home si todo sale bien
    } else {
      setError("No se pudo completar el registro. Intenta nuevamente.");
    }
  };

  return (
    <div
      className="card shadow rounded"
      style={{ maxWidth: 400, width: "100%" }}
    >
      <div className="card-header text-center bg-danger text-white">
        <h2>Registrarse</h2>
      </div>
      <div className="card-body bg-light">
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          <div className="d-grid">
            <Button type="submit" className="btn-primary">
              Registrarse
            </Button>
          </div>
        </form>
      </div>

      <div className="card-footer text-muted text-center">
        Bienvenido al Krusty Krab
      </div>

      {modalOpen && (
        <Modal
          title="Acceso Denegado"
          message="¡Plankton está vetado del lugar! 🦠"
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};
