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
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 flex flex-col"
    >
      {/* Product Image */}
      <div className="relative bg-gray-50">
        <ImageSlider images={imageUrls} />
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        {/* Name + Price */}
        <div className="flex items-start justify-between">
          <h2 className="font-semibold text-lg text-gray-900 line-clamp-2 pr-2">
            {product.name}
          </h2>
          <p className="text-indigo-600 font-bold whitespace-nowrap">
            ₹ {product.price}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2 line-clamp-3 leading-relaxed">
          {product.description}
        </p>

        {/* Category/Subcategory */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
            {product.categoryId?.name || "No Category"}
          </span>
          <span className="text-xs bg-violet-50 text-violet-700 px-3 py-1 rounded-full border border-violet-100">
            {product.subCategoryId?.name || "No Subcategory"}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-2 mt-5">
          <button
            onClick={() => onView(product)}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 font-medium"
          >
            View
          </button>
          <button
            onClick={() => onEdit(product)}
            className="flex-1 py-2.5 rounded-lg border border-yellow-300 text-yellow-700 hover:bg-yellow-50 transition-all duration-200 font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product)}
            className="flex-1 py-2.5 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 transition-all duration-200 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}
