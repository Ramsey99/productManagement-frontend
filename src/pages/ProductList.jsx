import { useState, useEffect } from "react";
import {
  getProducts,
  deleteProduct,
} from "../api/axios";
import ProductFilter from "../components/ProductFilter";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import ProductModal from "../components/ProductModal";
import SkeletonCard from "../components/SkeletonCard";

export default function ProductList() {
  const [filters, setFilters] = useState({ search: "", categoryId: "", subCategoryId: "" });
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ totalPages: 1, currentPage: 1 });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await getProducts({ page, limit: 50, ...filters });
      setProducts(res.products);
      console.log(res.products);      
      setMeta({ totalPages: res.totalPages, currentPage: res.currentPage });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => fetchProducts(1), 500);
    return () => clearTimeout(t);
  }, [filters]);

  useEffect(() => { fetchProducts(1); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await deleteProduct(id);
    fetchProducts(meta.currentPage);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button onClick={() => { setEditProduct(null); setFormOpen(true); }} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all">
          + Add Product
        </button>
      </div>

      <ProductFilter filters={filters} setFilters={setFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : products.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">No Products Found</div>
        ) : (
          products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onView={setModal}
              onEdit={(prod) => { setEditProduct(prod); setFormOpen(true); }}
              onDelete={() => handleDelete(p._id)}
            />
          ))
        )}
      </div>

      <div className="flex justify-center items-center gap-3 mt-8">
        <button
          disabled={meta.currentPage === 1}
          onClick={() => fetchProducts(meta.currentPage - 1)}
          className="border px-4 py-2 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {meta.currentPage} of {meta.totalPages}
        </span>
        <button
          disabled={meta.currentPage === meta.totalPages}
          onClick={() => fetchProducts(meta.currentPage + 1)}
          className="border px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <ProductModal open={!!modal} onClose={() => setModal(null)} product={modal} />

      {formOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">{editProduct ? "Edit Product" : "Add Product"}</h3>
              <button onClick={() => setFormOpen(false)}>✕</button>
            </div>
            <ProductForm
              initial={editProduct}
              onClose={() => setFormOpen(false)}
              onSaved={() => {
                setFormOpen(false);
                fetchProducts(1);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
