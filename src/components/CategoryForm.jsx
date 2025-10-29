import { useState, useEffect } from "react";

export default function CategoryForm({ initial = null, onCancel, onSaved }) {
  const [name, setName] = useState(initial?.name || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(initial?.name || "");
  }, [initial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSaved({ name });
    } catch (err) {
      console.error(err);
      alert("Error saving category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto transform transition-all duration-300 hover:shadow-2xl"
    >
      <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
        {initial ? "Edit Category" : "Add New Category"}
      </h2>

      <div className="relative mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder=" "
          className="peer w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 py-2"
        />
        <label
          htmlFor="name"
          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all duration-200"
        >
          Category Name
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 active:scale-95 transition-all duration-200"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2.5 rounded-lg font-semibold text-white shadow-md transform transition-all duration-300 active:scale-95 ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-300/40"
          }`}
        >
          {loading ? "Saving..." : initial ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
}
