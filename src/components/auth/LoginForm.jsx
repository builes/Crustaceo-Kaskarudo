import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export const LoginForm = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.toLowerCase().includes("plankton")) {
      setError("¡Plankton no está autorizado! 🦠");
      return;
    }

    const success = await login(email, password);

    if (success) {
      navigate("/");
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div
      className="card shadow rounded"
      style={{ maxWidth: 400, width: "100%" }}
    >
      <div className="card-header text-center bg-danger text-white">
        <h2>Iniciar sesión</h2>
      </div>
      <div className="card-body bg-light">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
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
              placeholder="Contraseña secreta..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger py-2 text-center">{error}</div>
          )}

          <div className="d-grid">
            <Button type="submit" className="btn-primary">
              Login
            </Button>
          </div>
        </form>
      </div>
      <div className="card-footer text-muted text-center">Krusty Krab</div>
    </div>
  );
};
