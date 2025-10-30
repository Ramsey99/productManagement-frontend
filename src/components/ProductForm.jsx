import { useState, useEffect } from "react";
import {
  getCategories,
  getSubCategories,
  addProduct,
  updateProduct,
} from "../api/axios";
import { motion } from "framer-motion";

export default function ProductForm({ initial, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    description: initial?.description || "",
    price: initial?.price || "",
    categoryId: initial?.categoryId?._id || "",
    subCategoryId: initial?.subCategoryId?._id || "",
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories);
    getSubCategories().then(setSubcategories);
  }, []);

  const filteredSub = form.categoryId
    ? subcategories.filter((s) => s.categoryId?._id === form.categoryId)
    : subcategories;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      for (let i = 0; i < files.length; i++)
        formData.append("images", files[i]);

      if (initial?._id) await updateProduct(initial._id, formData);
      else await addProduct(formData);

      onSaved();
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5 p-4 bg-white rounded-2xl shadow-lg border border-gray-100"
    >
      <div className="relative">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="peer w-full border border-gray-200 rounded-lg px-3.5 pt-5 pb-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
        />
        <label className="absolute left-3.5 top-2.5 text-gray-500 text-sm transition-all peer-focus:text-indigo-600 peer-focus:-translate-y-2 peer-focus:scale-90 peer-valid:-translate-y-2 peer-valid:scale-90">
          Product Name
        </label>
      </div>

      <div className="relative">
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows="3"
          className="peer w-full border border-gray-200 rounded-lg px-3.5 pt-5 pb-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
        />
        <label className="absolute left-3.5 top-2.5 text-gray-500 text-sm transition-all peer-focus:text-indigo-600 peer-focus:-translate-y-2 peer-focus:scale-90 peer-valid:-translate-y-2 peer-valid:scale-90">
          Description
        </label>
      </div>

      <div className="relative">
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
          className="peer w-full border border-gray-200 rounded-lg px-3.5 pt-5 pb-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
        />
        <label className="absolute left-3.5 top-2.5 text-gray-500 text-sm transition-all peer-focus:text-indigo-600 peer-focus:-translate-y-2 peer-focus:scale-90 peer-valid:-translate-y-2 peer-valid:scale-90">
          Price (₹)
        </label>
      </div>

      <div className="relative">
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white cursor-pointer"
        >
          <option value="">Select Category</option>
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

      <div className="relative">
        <select
          name="subCategoryId"
          value={form.subCategoryId}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white cursor-pointer"
        >
          <option value="">Select Subcategory</option>
          {filteredSub.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          ▼
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">
          Upload Images
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setFiles(Array.from(e.target.files))}
          className="block w-full text-sm text-gray-700 border border-gray-200 rounded-lg cursor-pointer focus:outline-none file:mr-3 file:py-1.5 file:px-3 file:border-0 file:rounded-md file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
        />

        {files.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {files.map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-16 h-16 object-cover rounded-lg border border-gray-200"
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition-all"
        >
          {loading ? "Saving..." : initial ? "Update Product" : "Add Product"}
        </button>
      </div>
    </motion.form>
  );
}
