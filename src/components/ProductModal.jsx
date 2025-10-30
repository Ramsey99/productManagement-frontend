import { motion, AnimatePresence } from "framer-motion";
import ImageSlider from "./ImageSlider";

export default function ProductModal({ open, onClose, product }) {
  if (!open || !product) return null;

  const images = (product.images || []).map(
    (img) =>
      `${
        import.meta.env.VITE_API_BASE?.replace("/api", "") ||
        "https://productmanagement-backend-fsw6.onrender.com"
      }${img}`
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden"
          >

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 text-gray-600 hover:text-white bg-gray-200 hover:bg-indigo-500 transition-all rounded-full w-9 h-9 flex items-center justify-center shadow"
            >
              ✕
            </button>

            <div className="w-full h-80 bg-gray-100">
              {images.length > 0 ? (
                <ImageSlider images={images} />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            <div className="p-6 space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start gap-3">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-indigo-600 font-bold text-lg">
                  ₹ {product.price}
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-3">
                <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
                  Category: {product.categoryId?.name || "N/A"}
                </span>
                <span className="text-xs bg-violet-50 text-violet-700 px-3 py-1 rounded-full border border-violet-100">
                  Subcategory: {product.subCategoryId?.name || "N/A"}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
