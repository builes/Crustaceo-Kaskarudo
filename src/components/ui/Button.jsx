// Creamos un componente reutilizable de botón
export const Button = ({
  children, // Texto o contenido interno del botón
  onClick, // Función que se ejecuta al hacer clic
  type = "button",
  disabled = false,
  className = "",
  ...props //Incluye cualquier otra prop (como aria-label, id, etc.)
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
