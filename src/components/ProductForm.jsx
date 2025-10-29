import { useState, useEffect } from "react";
import { getCategories, getSubCategories, addProduct, updateProduct } from "../api/axios";

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
      for (let i = 0; i < files.length; i++) formData.append("images", files[i]);

      if (initial?._id) await updateProduct(initial._id, formData);
      else await addProduct(formData);
      console.log("Submitting update for:", initial?._id);

      onSaved();
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border rounded p-2 w-full" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border rounded p-2 w-full" required />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="border rounded p-2 w-full" required />
      <select name="categoryId" value={form.categoryId} onChange={handleChange} className="border rounded p-2 w-full">
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      <select name="subCategoryId" value={form.subCategoryId} onChange={handleChange} className="border rounded p-2 w-full">
        <option value="">Select Subcategory</option>
        {filteredSub.map((s) => (
          <option key={s._id} value={s._id}>{s.name}</option>
        ))}
      </select>
      <input type="file" multiple accept="image/*" onChange={(e) => setFiles(Array.from(e.target.files))} />
      <div className="flex gap-3">
        <button disabled={loading} type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          {loading ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onClose} className="border px-4 py-2 rounded">Cancel</button>
      </div>
    </form>
  );
}
