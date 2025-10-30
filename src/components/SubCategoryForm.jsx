import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SubCategoryForm({ initial = null, categories = [], onCancel, onSaved }) {
  const [name, setName] = useState(initial?.name || "");
  const [categoryId, setCategoryId] = useState(initial?.categoryId?._id || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(initial?.name || "");
    setCategoryId(initial?.categoryId?._id || "");
  }, [initial]);

  const submit = async (e) => {
    e.preventDefault();
    if (!categoryId) return alert("Please select a category");
    setLoading(true);
    try {
      await onSaved({ name, categoryId });
    } catch (err) {
      console.error(err);
      alert("Error saving subcategory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-5"
    >
      <h2 className="text-lg font-semibold text-gray-800">
        {initial ? "Edit Subcategory" : "Add New Subcategory"}
      </h2>

      <div className="relative">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="peer w-full border border-gray-200 rounded-lg px-3.5 pt-5 pb-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
        />
        <label className="absolute left-3.5 top-2.5 text-gray-500 text-sm transition-all peer-focus:text-indigo-600 peer-focus:-translate-y-2 peer-focus:scale-90 peer-valid:-translate-y-2 peer-valid:scale-90">
          Subcategory Name
        </label>
      </div>

      <div className="relative">
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white cursor-pointer"
        >
          <option value="">-- Select Category --</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          ▼
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition-all"
        >
          {loading ? "Saving..." : initial ? "Update Subcategory" : "Add Subcategory"}
        </button>
      </div>
    </motion.form>
  );
}
