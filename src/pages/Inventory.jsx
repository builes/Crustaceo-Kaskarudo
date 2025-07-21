import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "../components/ui/Button";

export const Inventory = () => {
  const { token, role } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    stock: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/products");
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
    }
  };

  useEffect(() => {
    if (role === "admin") fetchProducts();
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Krusty Krab");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dlm5jhaxc/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error("Error subiendo imagen a Cloudinary:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    const endpoint = isEditing
      ? `http://localhost:3000/api/products/${editId}`
      : "http://localhost:3000/api/products";

    const cleanData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(cleanData),
      });

      const data = await res.json();
      if (data.success) {
        fetchProducts();
        resetForm();
      } else {
        alert(data.message || "Error al guardar producto");
      }
    } catch (err) {
      console.error("Error al enviar producto:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) fetchProducts();
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  };

  const startEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      stock: product.stock,
    });
    setEditId(product._id);
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      stock: "",
    });
    setEditId(null);
    setIsEditing(false);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (role !== "admin") {
    return (
      <div className="container my-5 text-center">
        <h2 className="text-danger">Acceso denegado</h2>
        <p>Esta sección es solo para administradores.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Gestión de Productos</h2>

      {/* Buscador */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Buscar producto por nombre"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Lista de productos */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredProducts.map((product) => (
          <div className="col" key={product._id}>
            <div className="card h-100 shadow">
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>${product.price.toFixed(2)}</strong> | Stock:{" "}
                  {product.stock}
                </p>
                <Button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => startEdit(product)}
                >
                  Editar
                </Button>
                <Button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(product._id)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario de creación / edición */}
      <div className="mt-5">
        <h4>{isEditing ? "Editar Producto" : "Crear Nuevo Producto"}</h4>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Nombre"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control"
                type="number"
                step="0.01"
                min="0"
                placeholder="Precio"
                required
              />
            </div>
            <div className="col-md-12">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Descripción"
                required
              />
            </div>

            {/* Subida de imagen a Cloudinary */}
            <div className="col-md-6">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imageUrl = await uploadImageToCloudinary(file);
                    if (imageUrl) {
                      setFormData((prev) => ({ ...prev, imageUrl }));
                    }
                  }
                }}
              />
            </div>

            {/* Campo visible u oculto para ver URL de imagen */}
            <div className="col-md-6">
              <input
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="form-control"
                placeholder="URL de la imagen (opcional)"
                required
              />
            </div>

            <div className="col-md-6">
              <input
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="form-control"
                type="number"
                min="0"
                placeholder="Stock"
                required
              />
            </div>

            <div className="col-12 d-flex gap-2">
              <Button type="submit" className="btn btn-success">
                {isEditing ? "Actualizar" : "Crear"}
              </Button>
              {isEditing && (
                <Button onClick={resetForm} className="btn btn-secondary">
                  Cancelar
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
