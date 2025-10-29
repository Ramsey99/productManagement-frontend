import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductList";
import CategoryList from "./pages/CategoryList";
import SubCategoryList from "./pages/SubCategoryList";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold">Product App</Link>
            <nav className="flex gap-4">
              <Link className="text-gray-600 hover:text-black" to="/">Products</Link>
              <Link className="text-gray-600 hover:text-black" to="/categories">Categories</Link>
              <Link className="text-gray-600 hover:text-black" to="/subcategories">Subcategories</Link>
            </nav>
          </div>
        </header>

        <main className="py-6">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/subcategories" element={<SubCategoryList />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
