import { useEffect, useState } from "react";
import { getCategories, getSubCategories } from "../api/axios";
import { motion } from "framer-motion";

export default function ProductFilter({ filters, setFilters }) {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
    getSubCategories().then(setSubcategories);
  }, []);

  const filteredSub = filters.categoryId
    ? subcategories.filter((s) => s.categoryId?._id === filters.categoryId)
    : subcategories;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white shadow-md rounded-2xl p-4 md:p-5 mb-6 flex flex-col md:flex-row items-center gap-4 border border-gray-100"
    >

      <div className="relative flex-1 w-full">
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 shadow-sm transition-all"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1016.65 16.65z"
          />
        </svg>
      </div>

      <select
        value={filters.categoryId}
        onChange={(e) =>
          setFilters({
            ...filters,
            categoryId: e.target.value,
            subCategoryId: "",
          })
        }
        className="px-4 py-2.5 border border-gray-200 rounded-full text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all cursor-pointer"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={filters.subCategoryId}
        onChange={(e) =>
          setFilters({ ...filters, subCategoryId: e.target.value })
        }
        className="px-4 py-2.5 border border-gray-200 rounded-full text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all cursor-pointer"
      >
        <option value="">All Subcategories</option>
        {filteredSub.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>
    </motion.div>
  );
}
