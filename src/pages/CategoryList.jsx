import { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../api/axios";
import CategoryForm from "../components/CategoryForm";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=> { load(); }, []);

  const handleAdd = () => { setEditing(null); setFormOpen(true); };
  const handleEdit = (cat) => { setEditing(cat); setFormOpen(true); };

  const handleSave = async (payload) => {
    if (editing) {
      await updateCategory(editing._id, payload);
    } else {
      await addCategory(payload);
    }
    setFormOpen(false);
    setEditing(null);
    await load();
  };

  const handleDelete = async (cat) => {
    if (!confirm("Delete category? This will not delete subcategories automatically.")) return;
    await deleteCategory(cat._id);
    await load();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button onClick={handleAdd} className="bg-indigo-600 text-white px-4 py-2 rounded">Add Category</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : categories.length === 0 ? (
        <div className="text-gray-500">No categories found.</div>
      ) : (
        <div className="grid gap-3">
          {categories.map(c => (
            <div key={c._id} className="flex items-center justify-between border rounded p-3">
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-gray-500">Created: {new Date(c.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>handleEdit(c)} className="px-3 py-1 bg-yellow-100 rounded">Edit</button>
                <button onClick={()=>handleDelete(c)} className="px-3 py-1 bg-red-100 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">{editing ? "Edit Category" : "Add Category"}</h3>
              <button onClick={()=>{ setFormOpen(false); setEditing(null); }}>✕</button>
            </div>

            <CategoryForm
              initial={editing}
              onCancel={() => { setFormOpen(false); setEditing(null); }}
              onSaved={handleSave}
            />
          </div>
        </div>
      )}
    </div>
  );
}
