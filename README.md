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

## 💾 Uso de Local Storage en el Proyecto

El proyecto utiliza `localStorage` como mecanismo de **persistencia local**, tanto para:

- La sesión del usuario
- El carrito de compras

Esto simula una experiencia cercana a la de un backend real.

### 🧑‍💻 Persistencia de Usuario

- El estado del usuario autenticado se guarda en `localStorage` con la clave `"user"`.
- Cuando la app se inicia, verifica si hay un usuario guardado y lo carga automáticamente.
- Al cerrar sesión, se elimina el usuario del almacenamiento.

> ✅ Esto permite que el usuario permanezca logueado tras recargar la página o cerrar el navegador.

### 🛒 Persistencia del Carrito de Compras

- Cada carrito se guarda con la clave `cart_<username>`.
- Esto permite que **cada usuario** tenga su propio carrito.
- Si no hay un usuario logueado, el carrito se vacía automáticamente.
- Cada vez que se modifica el carrito, se vuelve a guardar en `localStorage`.
