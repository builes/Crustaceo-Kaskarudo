🚀 Instalación del Proyecto

1. Clonar el repositorio:
   git clone https://github.com/tu-usuario/crustaceo-cascarudo.git
   cd crustaceo-cascarudo

2. Instalar dependencias:
   npm install

3. Ejecutar el servidor de desarrollo:
   npm run dev

Esto levantará el sitio en http://localhost:5173 (o el puerto que indique la terminal).

4. Scripts disponibles:
   npm run dev – Inicia el servidor en modo desarrollo.
   npm run build – Genera la versión de producción.
   npm run preview – Sirve la versión de producción localmente.

# 🧽 Proyecto: Crustáceo Cascarudo Web

---

## 🛠️ Tecnologías Utilizadas

- **React**: Biblioteca principal para la construcción de la interfaz.
- **Vite**: Herramienta moderna de desarrollo para proyectos React.
- **React Router DOM**: Manejo de rutas públicas y privadas.
- **Bootstrap**: Estilización rápida y responsive.
- **ESLint**: Linter para mantener el código limpio y consistente.
- **Context API**: Manejo de estado global (usuario autenticado, carrito de compras).

---

## 🔐 Rutas Privadas y Públicas en la Aplicación

La aplicación distingue entre rutas privadas y públicas, controlando el acceso según si el usuario está autenticado o no.

### ✅ Ruta Privada

- `/cart`: Requiere que el usuario esté logueado. Si no lo está, se redirige automáticamente a `/login`.

### 🌐 Rutas Públicas

- `/`: Página de inicio (Home).
- `/menu`: Página de menú, accesible a todos.
- `/login`: Solo accesible si el usuario no está logueado. Si ya está logueado, redirige a `/`.
- `*`: Página de error 404 (NotFound).

---

## 👤 Autenticación de Usuario

- No hay formulario de registro, ya que el proyecto aún no cuenta con backend.
- Los usuarios están simulados en el archivo `public/data/users.json`.
- El login verifica contra ese archivo local.
- Si un usuario intenta loguearse como **Plankton**, aparecerá un mensaje que indica que no es bienvenido.

---
