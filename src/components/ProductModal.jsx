export default function ProductModal({ open, onClose, product }) {
  if (!open || !product) return null;

  const images = (product.images || []).map(
    (img) => `${import.meta.env.VITE_API_BASE?.replace("/api", "") || "http://localhost:5000"}${img}`
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-lg overflow-auto p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <button onClick={onClose}>✕</button>
        </div>
        {images.length ? (
          <img src={images[0]} className="w-full h-60 object-cover rounded" />
        ) : (
          <div className="h-60 bg-gray-100 rounded flex items-center justify-center">No image</div>
        )}
        <p className="mt-3 text-gray-700">{product.description}</p>
        <p className="font-semibold text-indigo-600 mt-2">₹ {product.price}</p>
        <p className="text-sm text-gray-500">
          {product.categoryId?.name} → {product.subCategoryId?.name}
        </p>
      </div>
    </div>
  );
}
