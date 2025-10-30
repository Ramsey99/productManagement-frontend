import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ProductList from "./pages/ProductList";
import CategoryList from "./pages/CategoryList";
import SubCategoryList from "./pages/SubCategoryList";
import { motion } from "framer-motion";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800">
        <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <NavLink
              to="/"
              className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-all tracking-tight"
            >
              🛍️ Product Dashboard
            </NavLink>

            <nav className="flex gap-4 text-sm font-medium">
              {[
                { name: "Products", path: "/" },
                { name: "Categories", path: "/categories" },
                { name: "Subcategories", path: "/subcategories" },
              ].map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-3 py-1.5 rounded-md transition-all duration-300 ${
                      isActive
                        ? "text-indigo-600 bg-indigo-50 font-semibold"
                        : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <motion.main
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-10 px-4 sm:px-8"
        >
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/subcategories" element={<SubCategoryList />} />
          </Routes>
        </motion.main>

        <footer className="mt-auto text-center text-sm py-6 text-gray-500 border-t border-gray-100">
          Built with ❤️ by Anuradha Adhikari
        </footer>
      </div>
    </BrowserRouter>
  );
}
