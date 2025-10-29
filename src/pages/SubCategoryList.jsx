import { useEffect, useState } from "react";
import {
  getSubCategories,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getCategories,
} from "../api/axios";
import SubCategoryForm from "../components/SubCategoryForm";

export default function SubCategoryList() {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [subs, cats] = await Promise.all([getSubCategories(), getCategories()]);
      setSubcategories(Array.isArray(subs) ? subs : []);
      setCategories(Array.isArray(cats) ? cats : []);
    } catch (err) {
      console.error(err);
      alert("Failed to load subcategories or categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=> { load(); }, []);

  const handleAdd = () => { setEditing(null); setFormOpen(true); };
  const handleEdit = (s) => { setEditing(s); setFormOpen(true); };

  const handleSave = async (payload) => {
    if (editing) {
      await updateSubCategory(editing._id, payload);
    } else {
      await addSubCategory(payload);
    }
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
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Subcategories</h1>
        <button onClick={handleAdd} className="bg-indigo-600 text-white px-4 py-2 rounded">Add Subcategory</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : subcategories.length === 0 ? (
        <div className="text-gray-500">No subcategories found.</div>
      ) : (
        <div className="grid gap-3">
          {subcategories.map(s => (
            <div key={s._id} className="flex items-center justify-between border rounded p-3">
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-gray-500">{s.categoryId?.name || "—"}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>handleEdit(s)} className="px-3 py-1 bg-yellow-100 rounded">Edit</button>
                <button onClick={()=>handleDelete(s)} className="px-3 py-1 bg-red-100 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">{editing ? "Edit Subcategory" : "Add Subcategory"}</h3>
              <button onClick={()=>{ setFormOpen(false); setEditing(null); }}>✕</button>
            </div>

            <SubCategoryForm
              initial={editing}
              categories={categories}
              onCancel={() => { setFormOpen(false); setEditing(null); }}
              onSaved={handleSave}
            />
          </div>
        </div>
      )}
    </div>
  );
}
