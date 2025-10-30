import { useEffect, useState } from "react";
import {
  getSubCategories,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getCategories,
} from "../api/axios";
import SubCategoryForm from "../components/SubCategoryForm";
import { motion, AnimatePresence } from "framer-motion";

export default function SubCategoryList() {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [subs, cats] = await Promise.all([
        getSubCategories(),
        getCategories(),
      ]);
      setSubcategories(Array.isArray(subs) ? subs : []);
      setCategories(Array.isArray(cats) ? cats : []);
    } catch (err) {
      console.error(err);
      alert("Failed to load subcategories or categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const handleEdit = (s) => {
    setEditing(s);
    setFormOpen(true);
  };

  const handleSave = async (payload) => {
    if (editing) await updateSubCategory(editing._id, payload);
    else await addSubCategory(payload);
    setFormOpen(false);
    setEditing(null);
    await load();
  };

  const handleDelete = async (s) => {
    if (!confirm("Delete subcategory?")) return;
    await deleteSubCategory(s._id);
    await load();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 max-w-5xl mx-auto"
    >

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Subcategories</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all"
        >
          + Add Subcategory
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500 text-center py-10 animate-pulse">
          Loading subcategories...
        </div>
      ) : subcategories.length === 0 ? (
        <div className="text-gray-500 text-center py-10">
          No subcategories found.
        </div>
      ) : (
        <motion.div layout className="grid gap-4">
          {subcategories.map((s, i) => (
            <motion.div
              key={s._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 flex justify-between items-center"
            >
              <div>
                <div className="font-medium text-gray-800 text-lg">
                  {s.name}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Category:{" "}
                  <span className="text-indigo-600 font-medium">
                    {s.categoryId?.name || "—"}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(s)}
                  className="px-3 py-1.5 rounded-md border border-yellow-300 text-yellow-700 hover:bg-yellow-50 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s)}
                  className="px-3 py-1.5 rounded-md border border-red-300 text-red-700 hover:bg-red-50 transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {formOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 130, damping: 15 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
            >

              <SubCategoryForm
                initial={editing}
                categories={categories}
                onCancel={() => {
                  setFormOpen(false);
                  setEditing(null);
                }}
                onSaved={handleSave}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
