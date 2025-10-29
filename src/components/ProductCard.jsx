import ImageSlider from "./ImageSlider";
import { motion } from "framer-motion";

export default function ProductCard({ product, onView, onEdit, onDelete }) {
  const imageUrls = (product.images || []).map(
    (img) =>
      `${
        import.meta.env.VITE_API_BASE?.replace("/api", "") ||
        "http://localhost:5000"
      }${img}`
  );

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 flex flex-col"
    >
      {/* Image Slider */}
      <div className="relative">
        <ImageSlider images={imageUrls} />
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-xs font-medium text-indigo-600 px-3 py-1 rounded-full shadow">
          ₹ {product.price}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">
            {product.name}
          </h2>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-3 text-sm text-gray-500 flex items-center gap-1">
          <span className="font-medium text-indigo-600">
            {product.categoryId?.name || "No Category"}
          </span>
          <span>›</span>
          <span className="text-gray-500">
            {product.subCategoryId?.name || "No Subcategory"}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-2 mt-4">
          <button
            onClick={() => onView(product)}
            className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
          >
            View
          </button>
          <button
            onClick={() => onEdit(product)}
            className="flex-1 py-2 rounded-lg border border-yellow-200 text-yellow-700 hover:bg-yellow-50 transition-all duration-200"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product)}
            className="flex-1 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}
