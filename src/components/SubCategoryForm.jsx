import { useState, useEffect } from "react";

export default function SubCategoryForm({ initial = null, categories = [], onCancel, onSaved }) {
  const [name, setName] = useState(initial?.name || "");
  const [categoryId, setCategoryId] = useState(initial?.categoryId?._id || "");
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
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
    <form onSubmit={submit} className="space-y-3">
      <label className="block text-sm font-medium">Subcategory Name</label>
      <input value={name} onChange={e=>setName(e.target.value)} required className="w-full border rounded p-2" placeholder="Enter subcategory name" />
      <label className="block text-sm font-medium">Category</label>
      <select value={categoryId} onChange={e=>setCategoryId(e.target.value)} className="w-full border rounded p-2" required>
        <option value="">-- Select category --</option>
        {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
      </select>

      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">
          {loading ? "Saving..." : initial ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
}
